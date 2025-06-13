import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Area } from '../areas/area.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Area, (area) => area.tickets)
  area: Area;

  @Column({ default: 'pending' })
  status: 'pending' | 'in_progress' | 'finalized' | 'cancelled';

  @ManyToOne(() => User, (user) => user.tickets)
  user: User;

  @ManyToOne(() => User, { nullable: true })
  assignedTo: User;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}