import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
// Para que semánticamente quede bien, le cambio el nombre a Country
import { countries as Country } from '@prisma/client';
import { footerSection } from './sections/footer.section';

interface ReportOptions {
  title?: string;
  subtitle?: string;
  // La labor de este fuente es mostrar información, no hacer filtros ni manipular data.
  countries: Country[];
}

export const getCountryReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { title, subtitle, countries } = options;

  return {
    pageOrientation: 'landscape',
    header: headerSection({
      title: title ?? 'Countries Report',
      subtitle: subtitle ?? 'List of countries',
    }),
    footer: footerSection,
    pageMargins: [40, 110, 40, 60], // izquierda, arriba, derecha, abajo
    content: [
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [50, 50, 50, '*', 'auto', '*'],

          body: [
            ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],

            ...countries.map((country) => [
              country.id.toString() ?? '',
              country.iso2 ?? '',
              country.iso3 ?? '',
              { text: country.name ?? '', bold: true },
              country.continent ?? '',
              country.local_name ?? '',
            ]),

            // Forma simple de añadir totales
            // ['', '', '', '', '', ''],
            // [
            //   '',
            //   '',
            //   '',
            //   '',
            //   'Total',
            //   {
            //     text: `${countries.length} países`,
            //     bold: true,
            //   },
            // ],
          ],
        },
      },
      // Tabla de totales
      {
        text: 'Totales',
        margin: [0, 40, 0, 0],
        style: {
          fontSize: 18,
          bold: true,
        },
      },
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          widths: [50, 50, 70, '*', 'auto', '*'],
          body: [
            [
              {
                text: 'Total de países',
                colSpan: 2,
                bold: true,
              },
              {},
              {
                text: `${countries.length} países`,
                bold: true,
              },
              {},
              {},
              {},
            ],
          ],
        },
      },
    ],
  };
};
