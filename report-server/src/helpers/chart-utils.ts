import axios from 'axios';

interface ChartOptions {
  height?: number;
  width?: number;
}

export const chartJsToImage = async (
  chartConfig: unknown,
  options: ChartOptions = {},
) => {
  const params = new URLSearchParams();

  if (options.height) params.append('height', options.height.toString());
  if (options.width) params.append('width', options.width.toString());

  const encodedUri = encodeURIComponent(JSON.stringify(chartConfig));

  // Este es el URL con la configuración de la data del gráfico que queremos generar.
  const chartUrl = `https://quickchart.io/chart?c=${encodedUri}&${params.toString()}`;

  // Usamos arrayBuffer porque este get nos devuelve una imagen.
  const response = await axios.get(chartUrl, { responseType: 'arraybuffer' });

  // La imagen la pasamos a base64.
  return `data:image/png;base64,${Buffer.from(response.data).toString('base64')}`;
};
