import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentsRepository: Repository<Appointment>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async create(dto: CreateAppointmentDto, patient: User) {
    console.log('DTO:', dto);
    console.log('Paciente:', patient);
    const doctorExists = await this.usersRepository.exist({ where: { id: dto.doctorId, role: 'doctor' } });
    if (!doctorExists) {
      throw new NotFoundException('Doctor no encontrado');
    }

    const appointment = this.appointmentsRepository.create({
      reason: dto.reason,
      date: dto.date,
      status: 'pending', // ✅ fuerza el default manualmente
      doctor: { id: dto.doctorId } as User,
      patient: { id: patient.id } as User,
    });
    
    console.log(`NOTIFICACIÓN: Se enviaría un email a ${patient.email} avisando que su cita fue registrada correctamente.`);
    return this.appointmentsRepository.save(appointment);

  }

  async findByUser(user: User) {
    if (user.role === 'patient') {
      return this.appointmentsRepository.find({
        where: { patient: { id: user.id } },
        relations: ['doctor'],
        order: { date: 'DESC' },
      });
    }

    if (user.role === 'doctor') {
      return this.appointmentsRepository.find({
        where: { doctor: { id: user.id } },
        relations: ['patient'],
        order: { date: 'DESC' },
      });
    }

    // Si es admin, puede ver todo
    return this.appointmentsRepository.find({
      relations: ['doctor', 'patient'],
    });
  }

  async updateStatus(id: string, status: 'confirmed' | 'cancelled') {
    const appointment = await this.appointmentsRepository.findOne({ where: { id } });
    if (!appointment) throw new NotFoundException('Cita no encontrada');
    appointment.status = status;
    return this.appointmentsRepository.save(appointment);
  }

}
