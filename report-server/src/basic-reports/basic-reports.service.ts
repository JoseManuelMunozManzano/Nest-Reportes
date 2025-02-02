import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport } from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    // console.log('Connected to the database');
  }

  constructor(private readonly printerService: PrinterService) {
    // Para que inicialice la parte de PrismaClient
    super();
  }

  hello() {
    const docDefinition = getHelloWorldReport({
      name: 'José Manuel',
    });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
}
