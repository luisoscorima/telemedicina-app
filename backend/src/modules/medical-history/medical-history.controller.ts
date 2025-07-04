import { Controller, Post, Get, Body, Param, UseGuards, UnauthorizedException, Patch, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MedicalHistoryService } from './medical-history.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

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

  @Patch(':id')
  @Roles('admin','doctor')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async updateRecord(@Param('id') id: string, @Body() dto: { description: string }) {
    return this.service.updateRecord(id, dto.description);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async deleteRecord(@Param('id') id: string) {
    return this.service.deleteRecord(id);
  }

}
