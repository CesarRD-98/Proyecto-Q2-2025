import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from './area.entity';
import { AreasController } from './areas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Area])],
  controllers: [AreasController],
})
export class AreasModule {}
