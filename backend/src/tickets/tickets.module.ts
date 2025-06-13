import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { Ticket } from './ticket.entity';
import { User } from '../users/user.entity'; 
import { Area } from 'src/areas/area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, User, Area])],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
