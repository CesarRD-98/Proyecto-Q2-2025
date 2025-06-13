import { Repository } from 'typeorm';
import { Ticket } from '../tickets/ticket.entity';
export declare class ReportsService {
    private ticketRepo;
    constructor(ticketRepo: Repository<Ticket>);
    report(from: string, to: string): Promise<{
        total: number;
        finalized: number;
    }>;
}
