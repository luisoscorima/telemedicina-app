export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: 'patient' | 'doctor' | 'admin';
}
