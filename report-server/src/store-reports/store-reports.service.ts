import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { CompleteOrder, orderByIdReport } from 'src/reports';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  constructor(private readonly printerService: PrinterService) {
    // Para que inicialice la parte de PrismaClient
    super();
  }

  async getOrderByIdReport(orderId: number) {
    const order = await this.orders.findUnique({
      where: {
        order_id: orderId,
      },
      // Obtener todas las relaciones
      include: {
        customers: true,
        order_details: {
          include: {
            products: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    // console.log(JSON.stringify(order, null, 2));

    const docDefinition = orderByIdReport({ data: order as any });

    return this.printerService.createPdf(docDefinition);
  }
}
