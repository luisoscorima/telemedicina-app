import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Permite solicitudes desde cualquier origen, puedes restringirlo a dominios específicos 

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve campos que no están en el DTO
      forbidNonWhitelisted: true, // Lanza error si se envía un campo no permitido
      transform: true, // Transforma payloads (por ejemplo, strings a fechas) a objetos DTO
    }),
  );

  await app.listen(3000);
}
bootstrap();