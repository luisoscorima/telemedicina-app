import { IsUUID, IsDateString, IsString, MinLength } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @MinLength(5, { message: 'El motivo debe tener al menos 5 caracteres' })
  reason: string;

  @IsDateString({}, { message: 'La fecha debe estar en formato ISO (ej. 2025-07-02T15:00:00Z)' })
  date: Date;

  @IsUUID('4', { message: 'El ID del doctor debe ser un UUID válido' })
  doctorId: string;
}
// Este DTO se utiliza para crear una nueva cita médica.