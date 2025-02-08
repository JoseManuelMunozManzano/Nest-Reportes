// Cargamos el SVG usando el filesystem para evitar el error de espacios en blanco.
import fs from 'fs';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

// Aquí leemos el SVG
// Importante indicar utf-8, porque este SVG tiene este encoding.
const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf-8');

export const getBasicChartSrvReport =
  async (): Promise<TDocumentDefinitions> => {
    return {
      content: [
        {
          // Esto falla porque hay espacios en blanco (Error: SVGMeasure: Error: Non-whitespace before first tag.)
          // Este error se corrige cargando el fichero SVG desde el filesystem.
          // svg: 'src/assets/ford.svg',
          svg: svgContent,
          width: 100,
          fit: [100, 100],
        },
      ],
    };
  };
