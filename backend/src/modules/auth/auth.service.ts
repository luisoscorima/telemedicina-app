import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto'; // Asegúrate que exista

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) throw new UnauthorizedException('Contraseña incorrecta');

    return user;
  }

  async login(user: any) {
    const payload = { sub: user.id, role: user.role, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const newUser = await this.usersService.create({
        ...dto,
        password: hashedPassword,
      });

      const payload = { sub: newUser.id, role: newUser.role, email: newUser.email };

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('El correo ya está registrado');
      }
      throw new InternalServerErrorException('Error al registrar usuario');
    }
  }
}
