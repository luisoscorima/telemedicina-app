import { Appointment } from 'src/modules/appointments/entities/appointment.entity';
import { MedicalRecord } from 'src/modules/medical-history/entities/medical-record.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', length: 20 })
  role: 'patient' | 'doctor' | 'admin';

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointmentsAsPatient: Appointment[];

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointmentsAsDoctor: Appointment[];

  @OneToMany(() => MedicalRecord, (record) => record.patient)
  records: MedicalRecord[];

  @OneToMany(() => MedicalRecord, (record) => record.doctor)
  recordsCreated: MedicalRecord[];
}
