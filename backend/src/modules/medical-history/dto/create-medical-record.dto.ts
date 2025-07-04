import { IsString, IsUUID, MinLength } from 'class-validator';

export class CreateMedicalRecordDto {
  @IsUUID()
  patientId: string;

  @IsString()
  @MinLength(5)
  description: string;
}
