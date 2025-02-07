import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { orderByIdReport } from 'src/reports';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  constructor(private readonly printerService: PrinterService) {
    // Para que inicialice la parte de PrismaClient
    super();
  }

  async getOrderByIdReport(orderId: string) {
    const docDefinition = await orderByIdReport();

    return this.printerService.createPdf(docDefinition);
  }
}
