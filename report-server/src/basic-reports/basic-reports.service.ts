import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// TODO: Esto será optimizado después
import PdfPrinter from 'pdfmake';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

// 1. Definimos fuentes
const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf',
  },
};

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    // console.log('Connected to the database');
  }

  hello() {
    // 2. Crear instancia de la impresora
    const printer = new PdfPrinter(fonts);

    // 3. Creamos el documento
    const docDefinition: TDocumentDefinitions = {
      content: ['Hola Mundo'],
    };

    // 4. Crear pdf basado en el printer y su documento y devolverlo
    const doc = printer.createPdfKitDocument(docDefinition);

    return doc;
  }
}
