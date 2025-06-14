import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, ILike } from 'typeorm';
import { Ticket } from './ticket.entity';
import { User } from '../users/user.entity';
import { Area } from '../areas/area.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepo: Repository<Ticket>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Area)
    private areaRepo: Repository<Area>,
  ) {}

  async create(data: Partial<Ticket>) {
    const ticket = this.ticketRepo.create(data);

    if (data.area && typeof data.area === 'number') {
      const area = await this.areaRepo.findOneBy({ id: data.area });
      if (!area) throw new Error('Área no encontrada');
      ticket.area = area;
    }

    return this.ticketRepo.save(ticket);
  }

  async findAll(user: any, query: any) {
    const { status, from, to, description } = query;
    const options: any = {
      order: { createdAt: 'ASC' },
      relations: ['user', 'area', 'assignedTo'],
      where: {},
    };

    // Si es usuario normal, filtrar solo sus tickets
    if (user.role === 'user') {
      options.where.user = { id: user.id };
    }

    // Filtro por estado
    if (status) {
      options.where.status = status;
    }

    // Filtro por descripción parcial
    if (description) {
      options.where.description = ILike(`%${description}%`);
    }

    // Filtro por rango de fechas
    if (from && to) {
      options.where.createdAt = Between(new Date(from), new Date(to));
    } else if (from) {
      options.where.createdAt = Between(new Date(from), new Date());
    } else if (to) {
      options.where.createdAt = Between(new Date('2000-01-01'), new Date(to));
    }

    return this.ticketRepo.find(options);
  }

  async findOne(id: number) {
    return this.ticketRepo.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<Ticket>) {
    const ticket = await this.ticketRepo.findOne({
      where: { id },
      relations: ['user', 'assignedTo'],
    });

    if (!ticket) {
      throw new Error('Ticket no encontrado');
    }

    if (data.status) {
      const validStatuses = ['pending', 'in_progress', 'finalized', 'cancelled'];
      if (!validStatuses.includes(data.status)) {
        throw new Error('Estado no válido');
      }
      ticket.status = data.status;
    }

    if (data.assignedTo) {
      const techId = Number(data.assignedTo);
      if (isNaN(techId)) {
        throw new Error('ID de técnico inválido');
      }

      const tech = await this.userRepo.findOneBy({ id: techId });
      if (!tech || tech.role !== 'technician') {
        throw new Error('Técnico no válido');
      }

      ticket.assignedTo = tech;
    }

    return this.ticketRepo.save(ticket);
  }

  async countByStatus(from: Date, to: Date) {
    const [total, finalized] = await Promise.all([
      this.ticketRepo.count({ where: { createdAt: Between(from, to) } }),
      this.ticketRepo.count({
        where: { createdAt: Between(from, to), status: 'finalized' },
      }),
    ]);
    return { total, finalized };
  }

  async delete(id: number) {
    const ticket = await this.ticketRepo.findOne({ where: { id } });
    if (!ticket) {
      throw new Error('Ticket no encontrado');
    }
    await this.ticketRepo.remove(ticket);
    return { message: 'Ticket eliminado correctamente' };
  }
}
