import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { Appointment } from './modules/appointments/entities/appointment.entity';
import { User } from './modules/users/entities/user.entity';
import { MedicalHistoryModule } from './modules/medical-history/medical-history.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    UsersModule,
    AuthModule,
    AppointmentsModule,
    TypeOrmModule.forFeature([Appointment, User]),
    MedicalHistoryModule
  ],
})
export class AppModule {}
