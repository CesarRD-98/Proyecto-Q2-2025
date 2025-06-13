import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { User } from '../users/user.entity';
import { Area } from '../areas/area.entity';
export declare class TicketsService {
    private ticketRepo;
    private userRepo;
    private areaRepo;
    constructor(ticketRepo: Repository<Ticket>, userRepo: Repository<User>, areaRepo: Repository<Area>);
    create(data: Partial<Ticket>): Promise<Ticket>;
    findAll(user: any): Promise<Ticket[]>;
    findOne(id: number): Promise<Ticket>;
    update(id: number, data: Partial<Ticket>): Promise<Ticket>;
    countByStatus(from: Date, to: Date): Promise<{
        total: number;
        finalized: number;
    }>;
}
