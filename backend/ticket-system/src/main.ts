import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: '*', // o usa 'http://localhost:3000' para más seguridad
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const usersService = app.get(UsersService);

  // 👇 Seeding: crear usuario admin si no existe
  const adminEmail = 'admin@gmail.com';
  const admin = await usersService.findByEmail(adminEmail);
  if (!admin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await usersService.create({
      name: 'Administrador',
      email: adminEmail,
      password: 'admin123', // ✅ sin encriptar
      role: 'admin',
    });
    console.log('✅ Usuario admin creado:', adminEmail);
  } else {
    console.log('ℹ️ Usuario admin ya existe:', adminEmail);
  }

  await app.listen(5000);
}
bootstrap();
