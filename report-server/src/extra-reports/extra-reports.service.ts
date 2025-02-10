import fs from 'fs';
import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { getHtmlContent } from '../helpers/html-to-pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from 'src/reports/sections/header.section';
import { footerSection } from 'src/reports/sections/footer.section';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {}

  getHtmlReport() {
    //const html = fs.readFileSync('src/reports/html/basic-01.html', 'utf-8');
    // const html = fs.readFileSync('src/reports/html/basic-02.html', 'utf-8');
    const html = fs.readFileSync('src/reports/html/basic-03.html', 'utf-8');
    console.log(html);

    const content = getHtmlContent(html, {
      client: 'José Manuel',
      title: 'Curso de Node.js',
    });

    const docDefinition: TDocumentDefinitions = {
      pageMargins: [40, 110, 40, 60],
      header: headerSection({
        title: 'HTML to PDFMake',
        subtitle: 'Convertir HTML a PDFMake',
      }),
      footer: footerSection,
      // Podemos hacer las partes más fáciles como siempre, y las más complicadas en un archivo HTML.
      // content: ['Hola Mundo', content],
      content: content,
    };

    return this.printerService.createPdf(docDefinition);
  }
}
