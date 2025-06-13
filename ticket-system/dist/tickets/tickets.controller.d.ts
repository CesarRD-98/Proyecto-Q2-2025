import { TicketsService } from './tickets.service';
export declare class TicketsController {
    private ticketsService;
    constructor(ticketsService: TicketsService);
    create(body: any, req: any): Promise<import("./ticket.entity").Ticket>;
    findAll(req: any): Promise<import("./ticket.entity").Ticket[]>;
    findOne(id: number): Promise<import("./ticket.entity").Ticket>;
    update(id: number, body: any): Promise<import("./ticket.entity").Ticket>;
}
