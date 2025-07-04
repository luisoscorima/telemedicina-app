import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  reason: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ default: 'pending' })
  status: 'pending' | 'confirmed' | 'cancelled';

  @ManyToOne(() => User, (user) => user.appointmentsAsPatient, { eager: true })
  patient: User;

  @ManyToOne(() => User, (user) => user.appointmentsAsDoctor, { eager: true })
  doctor: User;

  @CreateDateColumn()
  createdAt: Date;
}