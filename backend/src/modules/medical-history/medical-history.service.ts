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

    const patient = await this.userRepo.findOne({ where: { id: dto.patientId, role: 'patient' } });
    if (!patient) {
      throw new NotFoundException('Paciente no encontrado');
    }

    const record = this.recordRepo.create({
      description: dto.description,
      patient: { id: dto.patientId } as User,
      doctor: { id: doctor.id } as User,
    });

    console.log(`NOTIFICACIÓN: Se enviaría un email a ${patient.email} avisando que hay un nuevo diagnóstico en su historial.`);
    return this.recordRepo.save(record);
  }

  async findByPatient(patientId: string) {
    return this.recordRepo.find({
      where: { patient: { id: patientId } },
      order: { createdAt: 'DESC' },
    });
  }

  async updateRecord(id: string, description: string) {
    const record = await this.recordRepo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Registro no encontrado');
    record.description = description;
    return this.recordRepo.save(record);
  }

  async deleteRecord(id: string) {
    const record = await this.recordRepo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Registro no encontrado');
    return this.recordRepo.remove(record);
  }

  async findAll() {
    return this.recordRepo.find({
      order: { createdAt: 'DESC' },
      relations: ['patient', 'doctor'],
    });
  }

  async findAllGrouped() {
    const records = await this.recordRepo.find({
      order: { createdAt: 'DESC' },
      relations: ['patient', 'doctor'],
    });

    // Agrupa por paciente
    const grouped = records.reduce((acc, rec) => {
      const key = rec.patient?.id || 'desconocido';
      if (!acc[key]) {
        acc[key] = {
          patient: rec.patient,
          records: []
        };
      }
      acc[key].records.push(rec);
      return acc;
    }, {});

    return Object.values(grouped); // [{ patient, records: [ ... ] }, ...]
  }
}
