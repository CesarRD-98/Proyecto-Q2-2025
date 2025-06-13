import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(body: any): Promise<import("./user.entity").User>;
}
