import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }
  
  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  logout(@GetUser() user: any) {
    // Aquí podrías implementar la lógica de cierre de sesión, como invalidar el token
    return { message: 'Usuario desconectado correctamente', user };
  }
}
