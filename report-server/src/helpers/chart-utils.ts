import axios from 'axios';

export const chartJsToImage = async (chartConfig: unknown) => {
  const encodedUri = encodeURIComponent(JSON.stringify(chartConfig));

  // Este es el URL con la configuración de la data del gráfico que queremos generar.
  const chartUrl = `https://quickchart.io/chart?c=${encodedUri}`;

  // Usamos arrayBuffer porque este get nos devuelve una imagen.
  const response = await axios.get(chartUrl, { responseType: 'arraybuffer' });

  // La imagen la pasamos a base64.
  return `data:image/png;base64,${Buffer.from(response.data).toString('base64')}`;
};
