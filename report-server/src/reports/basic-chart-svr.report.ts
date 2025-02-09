// Cargamos el SVG usando el filesystem para evitar el error de espacios en blanco.
import fs from 'fs';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as Utils from '../helpers/chart-utils';

// Aquí leemos el SVG
// Importante indicar utf-8, porque este SVG tiene este encoding.
const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf-8');

const generateChartImage = async () => {
  const chartConfig = {
    type: 'bar', // Show a bar chart
    data: {
      labels: [2012, 2013, 2014, 2015, 2016], // Set X-axis labels
      datasets: [
        {
          label: 'Users', // Create the 'Users' dataset
          data: [120, 60, 50, 180, 120], // Add data to the chart
        },
      ],
    },
  };

  return Utils.chartJsToImage(chartConfig);
};

const generateDonut = async () => {
  const DATA_COUNT = 5;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

  const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        label: 'Dataset 1',
        data: Utils.numbers(NUMBER_CFG),
        backgroundColor: Object.values(Utils.CHART_COLORS),
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      title: {
        display: true,
        text: 'Chart.js Doughnut Chart',
      },
    },
  };

  return Utils.chartJsToImage(config);
};

export const getBasicChartSrvReport =
  async (): Promise<TDocumentDefinitions> => {
    const [chart, chartDonut] = await Promise.all([
      generateChartImage(),
      generateDonut(),
    ]);

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
        {
          image: chart,
          width: 500,
        },
        {
          image: chartDonut,
          width: 500,
        },
      ],
    };
  };
