import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { Area } from './areas/area.entity';
import * as bcrypt from 'bcrypt';
import { LoggerInterceptor } from './common/interceptors/logger.interceptor';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggerInterceptor()); 

  const usersService = app.get(UsersService);
  const dataSource = app.get(DataSource);

  const adminEmail = 'admin@gmail.com';
  const admin = await usersService.findByEmail(adminEmail);
  if (!admin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await usersService.create({
      name: 'Administrador',
      email: adminEmail,
      password: 'admin123', // sin encriptar, se encripta internamente esto si me dio Problemas >.>!!!
      role: 'admin',
    });
    console.log('✅ Usuario admin creado:', adminEmail);
  } else {
    console.log('ℹ️ Usuario admin ya existe:', adminEmail);
  }

  const areaRepo = dataSource.getRepository(Area);
  const existingAreas = await areaRepo.count();

  if (existingAreas === 0) {
    await areaRepo.insert([
      { name: 'Sistemas' },
      { name: 'Soporte Técnico' },
      { name: 'Infraestructura' },
    ]);
    console.log('✅ Áreas insertadas correctamente');
  } else {
    console.log('ℹ️ Áreas ya existentes');
  }


  await app.listen(3000);
}
bootstrap();
