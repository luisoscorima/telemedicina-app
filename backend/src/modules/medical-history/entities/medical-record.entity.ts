import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('medical_records')
export class MedicalRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.records, { eager: true })
  patient: User;

  @ManyToOne(() => User, (user) => user.recordsCreated, { eager: true })
  doctor: User;

  @CreateDateColumn()
  createdAt: Date;
}