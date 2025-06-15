import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from './area.entity';

@Controller('areas')
export class AreasController {
  constructor(
    @InjectRepository(Area)
    private areaRepo: Repository<Area>,
  ) {}

  @Get()
  findAll() {
    return this.areaRepo.find();
  }
}
