import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from '../tickets/ticket.entity';
import { Between, Equal, Repository } from 'typeorm';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepo: Repository<Ticket>,
  ) {}

  async generateReport(from: string, to: string, areaId?: number) {
    const where: any = {
      createdAt: Between(new Date(from), new Date(to)),
    };

    if (areaId) {
      where.area = { id: areaId };
    }

    const [total, pending, inProgress, finalized, cancelled] = await Promise.all([
      this.ticketRepo.count({ where }),
      this.ticketRepo.count({ where: { ...where, status: 'pending' } }),
      this.ticketRepo.count({ where: { ...where, status: 'in_progress' } }),
      this.ticketRepo.count({ where: { ...where, status: 'finalized' } }),
      this.ticketRepo.count({ where: { ...where, status: 'cancelled' } }),
    ]);

    return {
      total,
      pending,
      inProgress,
      finalized,
      cancelled,
    };
  }
}
