import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  getProfile(@GetUser() user: any) {
    return {
      message: 'Usuario autenticado correctamente',
      user,
    };
  }

  @Get('admin/solo')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getOnlyAdmins(@GetUser() user: any) {
    return {
      message: 'Solo los administradores pueden ver esto',
      user,
    };
  }

  @Get('doctor-area')
  @Roles('doctor')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  doctorOnly(@GetUser() user: any) {
    return {
      message: 'Área exclusiva para médicos',
      user,
    };
  }

  @Get('patient-area')
  @Roles('patient')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  patientOnly(@GetUser() user: any) {
    return {
      message: 'Área exclusiva para pacientes',
      user,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }



  //@Roles('admin', 'doctor')
  //para que un usuario admin o doctor pueda acceder a esta ruta
}
