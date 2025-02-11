import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import type {
  BufferOptions,
  CustomTableLayout,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';

const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf',
  },
};

const customTableLayouts: Record<string, CustomTableLayout> = {
  customLayout01: {
    // Aquí creo mis layouts que puedo utilizar en cualquier lugar donde tenga mis tablas.
    hLineWidth: function (i, node) {
      if (i === 0 || i === node.table.body.length) {
        return 0;
      }
      return i === node.table.headerRows ? 2 : 1;
    },
    vLineWidth: function (i) {
      return 0;
    },
    hLineColor: function (i) {
      return i === 1 ? 'black' : '#bbb';
    },
    paddingLeft: function (i) {
      return i === 0 ? 0 : 8;
    },
    paddingRight: function (i, node) {
      return i === node.table.widths!.length - 1 ? 0 : 8;
    },
    fillColor: function (i, node) {
      if (i === 0) {
        return '#7b90be';
      }

      if (i === node.table.body.length - 1) {
        return '#acb3c1';
      }

      console.log(node.table.body.length);
      return i % 2 === 0 ? '#f3f3f3' : null;
    },
  },
  borderBlue: {
    hLineColor: function () {
      return '#5f96d4';
    },
    vLineColor: function () {
      return '#5f96d4';
    },
  },
};

@Injectable()
export class PrinterService {
  private printer = new PdfPrinter(fonts);

  createPdf(
    docDefinition: TDocumentDefinitions,
    options: BufferOptions = {
      tableLayouts: customTableLayouts,
    },
  ): PDFKit.PDFDocument {
    return this.printer.createPdfKitDocument(docDefinition, options);
  }
}
