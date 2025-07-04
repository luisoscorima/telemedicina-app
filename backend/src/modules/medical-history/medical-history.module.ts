import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalHistoryService } from './medical-history.service';
import { MedicalHistoryController } from './medical-history.controller';
import { MedicalRecord } from './entities/medical-record.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalRecord, User])],
  providers: [MedicalHistoryService],
  controllers: [MedicalHistoryController],
})
export class MedicalHistoryModule {}