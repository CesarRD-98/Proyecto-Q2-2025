import { ReportsService } from './reports.service';
export declare class ReportsController {
    private reportsService;
    constructor(reportsService: ReportsService);
    report(from: string, to: string): Promise<{
        total: number;
        finalized: number;
    }>;
}
