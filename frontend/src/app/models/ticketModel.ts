import { AreasType } from "./areasModel";
import { User } from "./userModel";

export interface Ticket {
    id: number;
    title: string;
    description: string;
    status: string;
    area: AreasType
    user: User
    createdAt: string;
}