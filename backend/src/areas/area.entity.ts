import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from '../tickets/ticket.entity';

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Ticket, (ticket) => ticket.area)
  tickets: Ticket[];
}
