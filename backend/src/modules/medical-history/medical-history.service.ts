import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalRecord } from './entities/medical-record.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';

@Injectable()
export class MedicalHistoryService {
  constructor(
    @InjectRepository(MedicalRecord)
    private readonly recordRepo: Repository<MedicalRecord>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  async create(dto: CreateMedicalRecordDto, doctor: User) {
    if (doctor.role !== 'doctor') {
      throw new UnauthorizedException('Solo médicos pueden crear registros');
    }

    const patientExists = await this.userRepo.exist({ where: { id: dto.patientId, role: 'patient' } });

    if (!patientExists) {
      throw new NotFoundException('Paciente no encontrado');
    }

    const record = this.recordRepo.create({
      description: dto.description,
      patient: { id: dto.patientId } as User,
      doctor: { id: doctor.id } as User,
    });

    return this.recordRepo.save(record);
  }

  async findByPatient(patientId: string) {
    return this.recordRepo.find({
      where: { patient: { id: patientId } },
      order: { createdAt: 'DESC' },
    });
  }
}
