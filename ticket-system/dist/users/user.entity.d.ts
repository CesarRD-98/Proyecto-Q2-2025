import { Ticket } from '../tickets/ticket.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'user' | 'technician' | 'admin';
    tickets: Ticket[];
}
