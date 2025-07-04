import { Body, Controller, Get, Post, UseGuards, Put, Param, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly service: AppointmentsService) { }

  @Post()
  create(@Body() dto: CreateAppointmentDto, @GetUser() user: User) {
    return this.service.create(dto, user);
  }

  @Get()
  getMyAppointments(@GetUser() user: User) {
    return this.service.findByUser(user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.service.updateStatus(id, body.status);
  }

  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body('status') status: 'confirmed' | 'cancelled') {
    return this.service.updateStatus(id, status);
  }

}