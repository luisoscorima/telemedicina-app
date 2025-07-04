import { Controller, Post, Get, Body, Param, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MedicalHistoryService } from './medical-history.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('medical-history')
export class MedicalHistoryController {
  constructor(private readonly service: MedicalHistoryService) { }

  @Post()
  create(@Body() dto: CreateMedicalRecordDto, @GetUser() doctor: User) {
    return this.service.create(dto, doctor);
  }

  @Get(':patientId')
  getByPatient(@Param('patientId') patientId: string, @GetUser() user: User) {
    if (user.role !== 'doctor' && user.role !== 'admin' && user.id !== patientId) {
      throw new UnauthorizedException('No autorizado');
    }
    return this.service.findByPatient(patientId);
  }

}
