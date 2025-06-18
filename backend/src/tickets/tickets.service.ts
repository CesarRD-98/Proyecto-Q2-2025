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
      console.log('Entro a la condicion')
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
  all?: boolean,
}) {
  const take = filters.all ? undefined : 10;
  const skip = filters.all ? undefined : (filters.page - 1) * 10;

  const where: any = {};

  if (!filters.all) {
    if (user.role === 'user') {
      where.user = { id: user.id };
      where.status = In(['pending', 'in_progress']);
    } else if (user.role === 'technician') {
      where.assignedTo = { id: user.id };
      if (filters.status) {
        where.status = filters.status;
      }
    } else if (user.role === 'admin') {
      if (filters.status) {
        where.status = filters.status;
      }
    }
  } else {
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
    take,
    skip,
  });

  return {
    total,
    page: filters.page,
    perPage: take ?? total,
    totalPages: take ? Math.ceil(total / take) : 1,
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