import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    findByEmail(email: string): Promise<User>;
    findById(id: number): Promise<User>;
    create(data: Partial<User>): Promise<User>;
}
