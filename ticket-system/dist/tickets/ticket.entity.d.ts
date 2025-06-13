import { User } from '../users/user.entity';
import { Area } from '../areas/area.entity';
export declare class Ticket {
    id: number;
    title: string;
    description: string;
    area: Area;
    status: 'pending' | 'in_progress' | 'finalized' | 'cancelled';
    user: User;
    assignedTo: User;
    createdAt: Date;
}
