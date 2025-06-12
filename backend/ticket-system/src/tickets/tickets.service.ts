import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { Between } from 'typeorm';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepo: Repository<Ticket>,
  ) {}

  async create(data: Partial<Ticket>) {
    const ticket = this.ticketRepo.create(data);
    return this.ticketRepo.save(ticket);
  }

  async findAll(user: any) {
    if (user.role === 'user') {
      return this.ticketRepo.find({ where: { user: { id: user.id } }, order: { createdAt: 'ASC' } });
    }
    return this.ticketRepo.find({ order: { createdAt: 'ASC' } });
  }

  async findOne(id: number) {
    return this.ticketRepo.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<Ticket>) {
    await this.ticketRepo.update(id, data);
    return this.findOne(id);
  }

  async countByStatus(from: Date, to: Date) {
    const [total, finalized] = await Promise.all([
      this.ticketRepo.count({ where: { createdAt: Between(from, to) } }),
      this.ticketRepo.count({ where: { createdAt: Between(from, to), status: 'finalized' } }),
    ]);
    return { total, finalized };
  }
}