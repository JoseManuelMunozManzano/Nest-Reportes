import { Controller, Get, Res } from '@nestjs/common';
import { ExtraReportsService } from './extra-reports.service';
import type { Response } from 'express';

@Controller('extra-reports')
export class ExtraReportsController {
  constructor(private readonly extraReportsService: ExtraReportsService) {}

  @Get('html-report')
  getHtmlReport(@Res() response: Response) {
    const pdfDoc = this.extraReportsService.getHtmlReport();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'html-report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('community-report')
  getCommunityReport(@Res() response: Response) {
    const pdfDoc = this.extraReportsService.getCommunityReport();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Billing-Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('custom-size')
  getCustomSize(@Res() response: Response) {
    const pdfDoc = this.extraReportsService.getCustomSize();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Billing-Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
