import {
  Controller,
  Post,
  Get,
  Param,
  Put,
  Body,
  UseGuards,
  Request,
  Delete,
  Query,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('tickets')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TicketsController {
  constructor(private ticketsService: TicketsService) { }

  @Post()
  @Roles('user', 'technician', 'admin')
  create(@Body() body: any, @Request() req) {
    return this.ticketsService.create({ ...body, user: req.user });
  }

  @Get()
  @Roles('user', 'technician', 'admin')
  findAll(
    @Request() req,
    @Query('page') page: string,
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('status') status: string,
    @Query('area') area: string,
  ) {
    const pageNumber = parseInt(page) || 1;
    return this.ticketsService.findAll(req.user, {
      page: pageNumber,
      from,
      to,
      status,
      area: area ? parseInt(area) : undefined,
    });
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

  @Delete(':id')
  @Roles('technician', 'admin')
  delete(@Param('id') id: number) {
    return this.ticketsService.delete(id);
  }

}