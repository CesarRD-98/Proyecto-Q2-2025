import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, In, Between } from 'typeorm';
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
  ) { }

  async create(data: Partial<Ticket>) {
    const ticket = this.ticketRepo.create(data);

    if (data.area && typeof data.area === 'number') {
      const area = await this.areaRepo.findOneBy({ id: data.area });
      if (!area) throw new Error('Área no encontrada');
      ticket.area = area;
    }

    return this.ticketRepo.save(ticket);
  }


  async findAll(user: any, filters: {
  page: number,
  from?: string,
  to?: string,
  status?: string,
  area?: number,
}) {
  const take = 10;
  const skip = (filters.page - 1) * take;

  const where: any = {};

  // 👤 Usuario normal
  if (user.role === 'user') {
    where.user = { id: user.id };
    where.status = In(['pending', 'in_progress']);
  }

  // 👨‍🔧 Usuario técnico
  if (user.role === 'technician') {
    where.assignedTo = { id: user.id }; // Solo los asignados a sí mismo
    if (filters.status) {
      where.status = filters.status;
    }
  }

  // 👑 Usuario admin
  if (user.role === 'admin') {
    if (filters.status) {
      where.status = filters.status;
    }
  }

  if (filters.area) {
    where.area = { id: filters.area };
  }

  if (filters.from && filters.to) {
    where.createdAt = Between(new Date(filters.from), new Date(filters.to));
  }

  const [tickets, total] = await this.ticketRepo.findAndCount({
    where,
    relations: ['user', 'area', 'assignedTo'],
    order: { createdAt: 'ASC' },
    skip,
    take,
  });

  return {
    total,
    page: filters.page,
    perPage: take,
    totalPages: Math.ceil(total / take),
    data: tickets,
  };
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
      this.ticketRepo.count({ where: { createdAt: Between(from, to), status: 'finalized' } }),
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