import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Ticket } from '../tickets/ticket.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepo: Repository<Ticket>,
  ) {}

  async report(from: string, to: string) {
    const startDate = new Date(from);
    const endDate = new Date(to);
    const total = await this.ticketRepo.count({ where: { createdAt: Between(startDate, endDate) } });
    const finalized = await this.ticketRepo.count({
      where: { createdAt: Between(startDate, endDate), status: 'finalized' },
    });
    return { total, finalized };
  }
}