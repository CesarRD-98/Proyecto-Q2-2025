import {
  Controller,
  Post,
  Get,
  Param,
  Put,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('tickets')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Post()
  @Roles('user', 'technician', 'admin')
  create(@Body() body: any, @Request() req) {
    return this.ticketsService.create({ ...body, user: req.user });
  }

  @Get()
  @Roles('user', 'technician', 'admin')
  findAll(@Request() req) {
    return this.ticketsService.findAll(req.user);
  }

  @Get(':id')
  @Roles('user', 'technician', 'admin')
  findOne(@Param('id') id: number) {
    return this.ticketsService.findOne(id);
  }

  @Put(':id')
  @Roles('technician', 'admin')
  update(@Param('id') id: number, @Body() body: any) {
    return this.ticketsService.update(id, body);
  }
}