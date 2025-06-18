import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('reports')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  @Roles('technician', 'admin')
  async getReport(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('area') areaId?: string,
  ) {
    return this.reportsService.generateReport(from, to, areaId ? +areaId : undefined);
  }
}
