import type {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

const styles: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 60, 0, 20], // izquierda, arriba, derecha, abajo
  },
  body: {
    alignment: 'justify',
    //margin: [0, 20], // izquierda/derecha, arriba/abajo
    margin: [0, 0, 0, 70],
  },
  signature: {
    fontSize: 14,
    bold: true,
    alignment: 'left', // Es el valor por defecto
  },
  footer: {
    fontSize: 10,
    italics: true,
    alignment: 'center',
    margin: [0, 0, 0, 20],
  },
};

const logo: Content = {
  // Estamos en el server, así que la imagen está basada en el filesystem.
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

export const getEmploymentLetteReport = (): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    // Estilos globales
    styles: styles,
    // Márgenes globales
    pageMargins: [40, 60, 40, 60],

    header: {
      columns: [
        logo,
        {
          text: DateFormatter.getDDMMMMYYYY(new Date()),
          alignment: 'right',
          margin: [20, 20],
        },
      ],
    },

    content: [
      {
        text: 'CONSTANCIA DE EMPLEO',
        style: 'header',
      },
      {
        text: `Yo, [Nombre del Empleador], en mi calidad de [Cargo del Empleador] de [Nombre de la Empresa],
por medio de la presente certifico que [Nombre del Empleado] ha sido empleado en nuestra
empresa desde el [Fecha de Inicio del Empleado].\n\n
Durante su empleo, el Sr./Sra. [Nombre del Empleado] ha desempeñado el cargo de [Cargo del
Empleado], demostrando responsabilidad, compromiso y habilidades profesionales en sus
labores.\n\n
La jornada laboral del Sr./ Sra. [Nombre del Empleado] es de [Número de Horas] horas
semanales, con un horario de [Horario de Trabajo], cumpliendo con las políticas y
procedimientos establecidos por la empresa.\n\n
Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.\n\n`,
        style: 'body',
      },
      // Este lo hacemos línea a línea por variar
      { text: 'Atentamente,', style: 'signature' },
      { text: '[Nombre del Empleador]', style: 'signature' },
      { text: '[Cargo del Empleador]', style: 'signature' },
      { text: '[Nombre de la Empresa]', style: 'signature' },
      { text: '[Fecha de Emisión]', style: 'signature' },
    ],

    footer: {
      text: 'Este documento es una constancia de empleo y no representa un compromiso laboral.',
      style: 'footer',
    },
  };

  return docDefinition;
};
