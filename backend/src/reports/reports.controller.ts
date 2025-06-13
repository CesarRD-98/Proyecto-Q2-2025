import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('reports')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  @Roles('technician', 'admin')
  report(@Query('from') from: string, @Query('to') to: string) {
    return this.reportsService.report(from, to);
  }
}