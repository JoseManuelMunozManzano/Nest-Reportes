import { Controller, Get, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import type { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  hello(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.hello();

    // 5. Devolver al cliente el pdf como respuesta
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hola-Mundo.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
