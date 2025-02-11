import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export const getCommunityReport = () => {
  const docDefinition: TDocumentDefinitions = {
    defaultStyle: {
      fontSize: 10,
    },
    content: [
      // Logo - Dirección - Núm. Orden
      {
        columns: [
          {
            image: 'src/assets/tucan-code-logo.png',
            width: 50,
          },
          {
            alignment: 'center',
            text: `Forest Admin Community SAP\n RUT: 44.123.1233\nCamino Montaña Km. 14\nTeléfono: 123 123 123`,
          },

          // Una tabla dentro de otra tabla. Tedioso y feo. En detalles del cliente vemos otra forma mejor
          // de hacer esto.
          {
            alignment: 'right',
            width: 140,
            layout: 'borderBlue',
            table: {
              body: [
                [
                  {
                    layout: 'noBorders',
                    table: {
                      body: [
                        ['No. Fact:', '123-456'],
                        ['Fecha:', '2025-01-11'],
                        ['Versión:', '2025-01'],
                      ],
                    },
                  },
                ],
              ],
            },
          },
        ],
      },

      // Línea horizontal
      {
        margin: [0, 5],
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 515,
            y2: 5,
            lineWidth: 2,
            lineColor: '#3A4546',
          },
        ],
      },

      // Detalles del cliente.
      // Se podría hacer usando HTML, pero vamos a practicar usando pdfMake.
      {
        table: {
          widths: ['auto', '*', 'auto', '*'],
          body: [
            [
              {
                text: 'Datos del cliente',
                fillColor: '#5775e1',
                color: 'white',
                colSpan: 4,
                // border: [false, false, false, false],
              },
              // Aunque no se usen (ver colSpan de 4 arriba) hay que dejarlos.
              {},
              {},
              {},
            ],

            // Razón social
            [
              {
                text: 'Razón social',
                fillColor: '#343a40',
                color: 'white',
                bold: true,
              },
              {
                text: 'Nombre de la empresa',
                fillColor: 'white',
              },
              {
                text: 'Dirección',
                fillColor: '#343a40',
                color: 'white',
              },
              {
                text: 'Calle falsa 123',
                fillColor: 'white',
              },
            ],

            // RUT y Teléfono
            [
              {
                text: 'RUT',
                fillColor: '#343a40',
                color: 'white',
                bold: true,
              },
              {
                text: '',
                fillColor: 'white',
              },
              {
                text: 'Teléfono',
                fillColor: '#343a40',
                color: 'white',
              },
              {
                text: '',
                fillColor: 'white',
              },
            ],

            // Giro y Condición de pago
            [
              {
                text: 'Giro',
                fillColor: '#343a40',
                color: 'white',
                bold: true,
              },
              {
                text: '',
                fillColor: 'white',
              },
              {
                text: 'Condición de Pago',
                fillColor: '#343a40',
                color: 'white',
              },
              {
                text: '',
                fillColor: 'white',
              },
            ],
          ],
        },
      },
    ],
  };

  return docDefinition;
};
