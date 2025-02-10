# NESTJS + REPORTES: GENERA PDFs DESDE NODE

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

Del curso de Fernando Herrera: https://cursos.devtalles.com/courses/nestjs-reportes

## Secciones

### Documentación

- http://pdfmake.org/#/
- http://pdfmake.org/playground.html
- https://pdfmake.github.io/docs/0.1/document-definition-object/headers-footers/
- https://pdfmake.github.io/docs/0.1/document-definition-object/images/
- https://pdfmake.github.io/docs/0.1/document-definition-object/tables/
- https://pdfmake.github.io/docs/0.1/document-definition-object/stack/
- https://pdfmake.github.io/docs/0.1/document-definition-object/headers-footers/
- https://pdfmake.github.io/docs/0.1/document-definition-object/tables/
- https://pdfmake.github.io/docs/0.1/document-definition-object/qr/
- https://pdfmake.github.io/docs/0.1/document-definition-object/svgs/
- https://pdfmake.github.io/docs/0.1/document-definition-object/images/
- https://www.chartjs.org/
- https://www.chartjs.org/docs/latest/samples/utils.html
- https://www.chartjs.org/docs/latest/samples/other-charts/doughnut.html
- https://www.chartjs.org/docs/latest/samples/line/point-styling.html
- https://www.chartjs.org/docs/latest/samples/bar/border-radius.html
- https://quickchart.io/documentation/
- https://www.npmjs.com/package/html-to-pdfmake
- https://github.com/Aymkdn/html-to-pdfmake?tab=readme-ov-file#use-with-node
- https://fonts.google.com/?query=roboto

### 1.Preparación de proyecto

- Proyecto report-server

En esta sección vamos a trabajar construyendo el proyecto básico para crear reportes después, puntualmente haremos:

- Proyecto de Nest
- Crear el docker-compose.yml con la configuración de:
  - PostgreSQL
  - pgAdmin
- Tabla de empleados
- Conectar Prisma con Nest

Creamos el proyecto con el comando `nest new report-server` y seleccionamos `npm`.

Accedemos a la carpeta `report-server` y ejecutamos `npm run start:dev` para empezar a ejecutar nuestro proyecto.

La ruta por defecto (para Postman o el navegador) es `http://localhost:3000`.

En mi Raspberry Pi, en la carpeta `docker/postgresql` tengo un fichero `docker-compose.yml` para ejecutar y tener `PostgreSQL` en mi Raspberry Pi.

Accedo a `pgAdmin` y creo un nuevo servidor con esta data:

En la pestaña General indicamos `Nombre: Nest Reports Database`

En la pestaña Conexión indicamos:

- `Nombre/Dirección de servidor: postgres_database` que es el nombre del `container_name` de mi archivo `docker-compose.yml`
- `Port: 5432`
- `Username: postgres`
- `Contraseña: <la mia>`

Con esto pulsamos Aceptar y se crea la BD.

En la carpeta `report-server/sql/01-employees.sql` tenemos los SQL con la carga inicial de nuestra BD. Hay que llevarlo a `pgAdmin` y ejecutar esas consultas para dar de alta la data.

Una vez grabada la data, confirmarlo con la siguiente consulta: `SELECT * FROM EMPLOYEES;`.

Para conectar nuestra aplicación de Nest con nuestra BBDD vamos a usar `Prisma`, que es un ORM que nos va a permitir trabajar con la BBDD.

Seguir la documentación oficial `https://docs.nestjs.com/recipes/prisma` para realizar la instalación.

En concreto, ejecuto `npx prisma init`.

Esta instalación nos crea:

- El archivo `.env` con la cadena de conexión para una BBDD PostgreSQL por defecto. Tenemos que cambiar la cadena de conexión a la nuestra
- La carpeta `prisma`

También instalo Prisma Client con el comando `npm i @prisma/client`.

En la carpeta `report-server/postman` están todas las peticiones http.

Ya puedo empezar a generar código.

#### basic-reports

Creo usando el CLI de Nest un resource: `nest g resource basic-reports --no-spec`. Selecciono `REST API` y a la pregunta sobre si queremos generar CRUD entry points respondemos `n`.

Bajamos el proyecto si lo tenemos arrancado y ejecutamos `npx prisma db pull`. Con esto se construye nuestro esquema basando en el esquema que tenemos en BBDD.

Para generar el cliente ejecutamos `npx prisma generate`. Es una función helper que ya sabe como luce nuestra BBDD porque ya está mapeada en nuestro esquema de Prisma.

Levantamos de nuevo la aplicación con el comando: `npm run start:dev`.

Ruta en Postman: `http://localhost:3000/basic-reports`

**Ejecutar en Dev**

1. Clonar el proyecto
2. Instalar dependencias `npm install`
3. Clonar `.env.template` y renombrar a `.env` y completar las variables de entorno
4. Levantar la BBDD `docker compose up -d` en mi Raspberry Pi
5. Generar el Prisma client `npx prisma generate`
6. Ejecutar proyecto `npm run start:dev`

### 2.Constancia de empleo

En esta sección prepararemos muchas bases para trabajar los reportes y explicaciones de cómo trabaja la herramienta de `PdfMake`.

Puntualmente aprenderemos:

- Estructura del contenido del reporte
- Crear encabezados y pies de página
- Trabajar con imágenes desde el backend
- Formatear fechas
- Columnas
- Cargar data en el reporte
- Estilos personalizados
- Secciones del reporte de forma reutilizable
- Crear una constancia laboral

**Instalación**

- Estamos trabajando con Nest, que es server-side, por tanto la instalación es: `npm install pdfmake`
- Para TypeScript instalamos también: `npm i --save-dev @types/pdfmake`
- Para la fuente Roboto, se ha creado en la raiz del proyecto la carpeta fonts y se ha descargado de Google Fonts

**Funcionamiento**

Vamos a generar un módulo para PdfMake con el comando `nest g module printer`.

Vamos a generar un service para PdfMake con el comando `nest g service printer --no-spec`

Generamos manualmente la carpeta `reports` dentro de la carpeta `src`, y dentro creamos el archivo `hello-world.report.ts`, donde creo las funciones que acabaré llamando para traer la información.

- En printer.service.ts
  - 1. Importamos `pdfmake`
  - 2. Definimos los fonts
  - 3. Crear instancia de la impresora
  - 4. Crear el pdf basado en el printer, su document definition y opciones que se pasen
- En hello-world.report.ts
  - 5. Creamos el document definition y se devuelve
- En basic-reports.service.ts
  - 6. Llamamos al método de hello-world.report.ts
  - 7. Llamamos al método de printer.service.ts
- En basic-reports.controller.ts
  - 8. Devolver al cliente el pdf como respuesta

Se ha creado, dentro de `src`, la carpeta `assets`, donde pondremos las distintas imágenes que usemos.

**PDF Employment Service**

Petición GET: `http://localhost:3000/basic-reports/employment-letter`

Para empezar a crear la carta `employment-letter`, creamos el `@Get()` en el controlador `basic-reports.controller.ts`.

Luego vamos a `basic-reports.service.ts` y creamos el servicio `employmentLetter()`.

En la carpeta `reports` creamos el archivo `employment-letter.report.ts`.

En la carpeta `src` creamos la carpeta `helpers` y dentro el archivo `date-formatter.ts`.

**Componentes**

Vamos a dividir nuestro PDF en distintos componentes.

En la carpeta `reports` creamos la carpeta `sections` y dentro creamos el archivo `header.section.ts`.

**Cargar información del empleado**

Petición GET: `http://localhost:3000/basic-reports/employment-letter/1`

En el fuente `basic-reports.controller.ts` creamos una nueva petición Get `employmentLetterById()`.

En elfuente `basic-reports.service.ts` creamos el método `employmentLetterById()`.

**Testing**

Tras ejecutar el proyecto, en Postman hacer la siguiente petición GET: `http://localhost:3000/basic-reports`

Si da un error `TypeError: pdfmake_1.default is not a constructor` es por la versión de PdfMake. Para corregirlo, ir al fuentte `tsconfig.json` y añadir la opción `"esModuleInterop": true` y volver a probar.

### 3.Tablas - Listado de países

En esta sección trabajaremos con tablas, encabezados reutilizables y pie de página.

Puntualmente veremos:

- Reutilizar componentes
- Número al pie de página
- Tablas
- Personalización de tablas
- Estilos personalizados reutilizables
- Múltiples tablas en un reporte
- Totales del reporte

**Base de datos de Países**

En la carpeta `report-server/sql/02-countries.sql` tenemos los SQL con la carga inicial de nuestra BD. Hay que llevarlo a `pgAdmin` y ejecutar esas consultas para dar de alta la data.

Una vez grabada la data, confirmarlo con la siguiente consulta: `SELECT * FROM COUNTRIES;`.

Nos vamos a una terminal y accedemos a la carpeta del proyecto. Vamos a reconstruir el modelo usando Prisma, ejecutando: `npx prisma db pull`, que verifica como está la BD y crea el esquema en Prisma basado en la BD.

Esto crea automáticamente en el proyecto, en el archivo `prisma/schema.prisma` los modelos `countries` y `continents`.

Y, por último ejecutamos `npx prisma generate` para generar el nuevo cliente que va a tener las nuevas definiciones de los paises y continentes y que usaremos para interactuar con nuestra BD.

**Reportes con tablas**

En `basic-reports.controller.ts` creamos un nuevo endpoint con nombre de método `getCountriesReport()`.

En `basic-reports.service.ts` creamos un nuevo método de reporte con nombre `getCountries()`.

Nos creamos el reporte. En la carpeta `reports` creamos el archivo `countries.report.ts`.

**Personalizar el encabezado**

Modificamos `header.section.ts`.

**Mostrar listado de países**

Modificamos `countries.report.ts` para pasar las entradas de países al report.

Modificamos `basic-reports.service.ts` para suministrar dicha data.

**Pie de página con numeración**

Creamos el archivo `reports/section/footer.section.ts`.

Actualizamos `countries.report.ts` para utilizar el footer.

**Mostrar totales de tabla**

Se hace como una tabla.

Primero lo hacemos de manera simple, en `countries.report.ts`.

**Estilo personalizado de tablas**

Modificamos `printer.service.ts` añadiendo `customTableLayouts` para hacerlo global a todos los reports.

Modificamos nuestro report `countries.report.ts` para usar nuestro nuevo layout `customLayout01`.

**Testing**

Tras ejecutar el proyecto, en Postman hacer la siguiente petición GET: `http://localhost:3000/basic-reports/countries`

### 4.Recibo de compra - Maestro detalle relacionado

El objetivo principal de esta sección, es construir un recibo de compra que se basa en una serie de tablas (Maestro detalle), pero quiero recorrer la milla extra y hacer que ese detalle sea bien complejo, lo más apegado a la vida real.

Puntualmente veremos:

- Códigos QR
- Inner joins
- Tablas y estilos
- Estructura y alineamiento
- Envío de data de Prisma a reporte

**Base de datos**

En la carpeta `report-server/sql/03-master-detail.sql` tenemos los SQL con la carga inicial de nuestra BD. Hay que llevarlo a `pgAdmin` y ejecutar esas consultas para dar de alta la data.

Una vez grabada la data, confirmarlo con, por ejemplo, la siguiente consulta: `SELECT * FROM PRODUCTS;`.

Nos vamos a una terminal y accedemos a la carpeta del proyecto. Vamos a reconstruir el modelo usando Prisma, ejecutando: `npx prisma db pull`, que verifica como está la BD y crea el esquema en Prisma basado en la BD.

Esto crea automáticamente en el proyecto, en el archivo `prisma/schema.prisma` los modelos nuevos.

Y, por último ejecutamos `npx prisma generate` para generar el nuevo cliente que va a tener las nuevas definiciones y que usaremos para interactuar con nuestra BD.

**Preparar módulo, controlador y servicio**

Ejecutamos en una terminal y accediendo a la carpeta de nuestro proyecto: `nest g resource storeReports --no-spec`, seleccionamos `REST API` y respondemos `n` a la pregunta sobre si se genera el CRUD completo. Esto crea la carpeta `store-reports`.

En `store-reports.controller.ts` nos creamos el `@Get()`.

En `store-reports.module.ts` importamos `PrinterModule`.

En `store-reports.service.ts` inyectamos en el constructor `PrinterService` y creamos el método `getOrderByIdReport`.

**Factura - Creación del reporte*

En la carpeta `reports` creamos un nuevo reporte `order-by-id.report.ts`.

Modificamos `store-reports.service.ts` para llamar al método `orderByIdReport`.

**Código QR**

Modificamos `order-by-id.report.ts` para añadir el código referente al QR.

**Estilo en la misma línea**

Modificamos `order-by-id.report.ts` para añadir estilos en la misma línea.

**Tabla con el detalle**

Modificamos `order-by-id.report.ts` para añadir la tabla.

Nos creamos en la carpeta `helpers` un archivo `currency-formatter.ts`.

**Relaciones de base de datos**

En PgAdmin ejecutamos el siguiente SQL:

```
SELECT
	*
FROM
	ORDERS
	INNER JOIN ORDER_DETAILS ON ORDERS.ORDER_ID = ORDER_DETAILS.ORDER_ID
	INNER JOIN PRODUCTS ON ORDER_DETAILS.PRODUCT_ID = PRODUCTS.PRODUCT_ID
	INNER JOIN CUSTOMERS ON ORDERS.CUSTOMER_ID = CUSTOMERS.CUSTOMER_ID
WHERE
	ORDERS.ORDER_ID = 10250;
```

Con esta información generaremos dinámicamente el reporte.

En un entorno real nos podríamos crear una vista.

**Prisma - Información completa del recibo**

Modificamos `store-reports.controller.ts` para llamar al método `getOrderByIdReport` pasando siempre un number.

Modificamos `store-reports.service.ts` para recibir un number. Además hacemos la consulta anterior (a la manera de Prisma) para obtener la data de BD y mandarla usando el método `orderBydIdReport()`.

En `order-by-id-report.ts` creamos una interface para tipado estricto de TypeScript. Usamos la extensión de VSCode `Paste JSON as Code` copiando del terminal el JSON obtenido de la data con la siguiente instrucción `console.log(JSON.stringify(order, null, 2));`.

**Prisma - Mostrar información del recibo**

Modificamos `order-by-id.report.ts` para sustituir el hardcode por la data correcta.

**Testing**

Tras ejecutar el proyecto, en Postman hacer la siguiente petición GET: `http://localhost:3000/store-reports/orders/10250` para una order correcta, y `http://localhost:3000/store-reports/orders/1` para ver la excepción.

### 5.Gráficos y SVG

En esta sección aprenderemos a generar gráficos y colocarlos en nuestro reporte, también usaremos SVGs los cuales no son diferentes a las imágenes.

Puntualmente veremos:

- Chart.js
- Queries de conteo en prisma
- Gráficos de:
- Dona
- Lineas
- Barras
- Ubicarlos en lugares deseados
- Parametrizar y reutilizarlos

**Mostrar SVGs**

Es un ejemplo sencillo para mostrar un SVG. PdfMake soporta imágenes SVG, siempre que no contengan espacios. Este error se corrige cargando el fichero SVG desde el filesystem.

Añadimos a nuestro controller `store-reports.controller.ts` un nuevo método get `getSvgChart()` que llama al método del service `getSvgChart()`.

Creamos en `store-reports.service.ts` el método `getSvgChart()`.

En la carpeta `reports` creamos un nuevo archivo `basic-chart-svr.report.ts` y dentro un método `getBasicChartSrvReport()`.

**Mostrar un gráfico**

Vamos a mostrar una gráfica de `Chart.js` en nuestro reporte.

Vamos a usar `QuickChart`, que nos ofrece un endpoint para, dada una configuración de `Chart.js`, nos genera la gráfica como una imagen.

Este último paso no es necesario porque podemos renderizar la gráfica localmente en un div de un Html, y luego pasar este elemento renderizado.

Otra forma es instalar el paquete `npm install chartjs-node-canvas` que genera la gráfica desde el lado del backend.

En nuestro archivo `basic-chart-svr.report.ts` creamos el método `generateChartImage()`.

En la carpeta `helpers` creamos un nuevo archivo `chart-utils.ts`.

Instalamos axios para las peticiones: `npm i axios`.

**Parámetros adicionales - QuickChart**

Modificamos el fuente `chart-utils.ts` para que espere parámetros adicionales y pueda personalizarse.

**Utilidades para Chart.js**

En la web de Chart.js aparece un fichero `Utils` (https://www.chartjs.org/docs/latest/samples/utils.html). El problema es que no están en TypeScript. En el curso nos dan ese archivo de utilidades pero transformado a TypeScript.

Añadimos al archivo `chart-utils.ts` ese nuevo código e instalamos el paquéte `npm i @kurkle/color` para que nuestras imágenes se vean más bonitas.

Vamos a crear una gráfica muy similar a `https://www.chartjs.org/docs/latest/samples/other-charts/doughnut.html`.

Cogemos la configuración de esa URL (tab Config y Setup), vamos al fuente `basic-chart-svg.report.ts` y genero otra función para esa gráfica.

Esto lo vamos a acabar cambiando para generalizar el tipo de gráfico en una función `helpers`.

**Reporte de dona - Mejores 10 países**

El query para obtener los mejores 10 países, escrito en PgAdmin es:

```
SELECT COUNT(*), COUNTRY
FROM CUSTOMERS
GROUP BY COUNTRY
ORDER BY COUNT(*) DESC
LIMIT 10;
```

Esta consulta la tenemos que pasar a Prisma.

En `store-reports.controller.ts` creamos un nuevo endpoint Get `statistics` y acabamos llamando al método del service `getStatistics()`.

En `store-reports.service.ts` creamos dicho método `getStatistics()` y aquí es donde pasamos la Query a formato Prisma. Acabamos llamando al método de reporte `getStatisticsReport()`.

En la carpeta `reports` creamos el nuevo reporte `statistics.report.ts`.

**Mostrar información en el reporte**

Modificamos el reporte `statistics.report.ts`.

Corregimos `store-reports.service.ts` para hacer la llamada correcta.

**Reutilizar código para otras gráficas**

Para reutilizar código vamos a crear funciones helpers.

En la carpeta `reports` creamos otra carpeta para poner nuestras gráficas llamada `charts`.

Dentro de `charts` nos creamos un archivo `donut.chart.ts`.

Nos generamos la copia `statistics.report.copy.ts` para no perderla.

Nos llevamos la función `generateTopCountryDonut()` de `statistics.report.ts` a `donut.chart.ts` y le cambiamos el nombre a `getDonutChart()` para que sea más genérico y lo modificamos.

Modificamos `statistics.report.ts`.

**Mostrar tabla - Mejores 10 países**

Modificamos `statistics.report.ts` para añadir la tabla.

**Sección de encabezado**

Modificamos `statistics.report.ts` para añadir el encabezado.

Modificamos `header.section.ts` para que entre bien el texto de título y subtítulo.

**Gráfica lineal**

Dentro de `charts` nos creamos un archivo `line.chart.ts`.

Modificamos `statistics.report.ts` para llamar al método `getLineChart()`.

**Gráfica de barras**

Dentro de `charts` nos creamos un archivo `bars.chart.ts`.

Modificamos `statistics.report.ts` para llamar al método `getBarsChart()`.

**Gráfica Polar Area**

Dentro de `charts` nos creamos un archivo `polar.chart.ts`.

Modificamos `statistics.report.ts` para llamar al método `getPolarChart()`.

**Testing**

Tras ejecutar el proyecto, en Postman hacer las siguientes peticiones GET: 

```
http://localhost:3000/store-reports/svgs-charts

http://localhost:3000/store-reports/statistics
```

### 6.Utilidades y diseño complejo

En esta sección quiero que hagamos dos cosas principales:

- Convertir HTML a PdfMake
- Trabajar diseños de tablas complejos

Esta sección tiene por objetivo que podamos buscar formas de desarrollar contenidos elaborados y complejos de forma sencilla y poder crear reportes atractivos a la vista.

**Preparar módulo, controlador y servicio**

Creo usando el CLI de Nest un resource: `nest g resource extra-reports --no-spec`. Selecciono `REST API` y a la pregunta sobre si queremos generar CRUD entry points respondemos `n`.

En `extra-reports.controller.ts` nos creamos el `@Get()`.

En `extra-reports.module.ts` importamos `PrinterModule`.

En `extra-reports.service.ts` inyectamos en el constructor `PrinterService` y creamos el método `getHtmlReport()`.

**HTML to PdfMake**

Instalamos el siguiente paquete: `npm i html-to-pdfmake` y su tipado para TypeScript `npm i --save-dev @types/html-to-pdfmake`.

`html-to-pdfmake` está pensado para un uso de cliente. Para usarlo desde el server hay que instalar el siguiente paquete: `npm i jsdom`, que permite crear un DOM virtual.

En la carpeta `reports` creamos una nueva carpeta `html` y dentro creamos el archivo `basic-01.html`.

Modificamos `extra-reports.service.ts` para acceder al filesystem y cargar nuestro archivo html.

Nos creamos una función helper para utilizar el paquete `html-to-pdfmake`. En la carpeta `helpers` creamos el archivo `html-to-pdfmake.ts`.

**HTML Complejo**

En la carpeta `html` creamos los archivos `basic-02.html` y `basic-03.html`. Este último archivo es como `basic-02.html` pero con una sintaxis inventada.

Modificamos `extra-reports.service.ts` para acceder al filesystem y cargar nuestro archivo html.

Vemos como hacer un reemplazo de variables en el HTML. Para ello modificamos el archivo `html-to-pdfmake.ts` para que reciba parámetros que sustituyan partes del html.

En caso de necesitar realizar operaciones más complejas, una alternativa es usar procesadores HTML como Handlebars o Pug: `https://handlebarsjs.com/installation/#usage`. Ejemplo:

```
import { compile } from 'handlebars'; 

export const handlebarsToHtml = <T>(template:string, context: T) => {
  const templateFn = compile(template);  
  return templateFn(context); 
};
```

Para reemplazar variables se puede usar también expresiones regulares. Ejemplo:

```
import htmlToPdfmake from 'html-to-pdfmake';
import { JSDOM } from 'jsdom';

const regex = /\{\{\s*([^}]+?)\s*\}\}/g;

export interface ContentReplacer {
    [key: string]:string;
}

export const getHtmlContent = (html:string="", replace: ContentReplacer={}) => {
    html = html.replaceAll(regex, (match, key) => {
        return replace.hasOwnProperty(key) ? replace[key].toString() : match; 
    });

    const { window } = new JSDOM();

    return htmlToPdfmake(html,{window});
}
```

**Testing**

Tras ejecutar el proyecto, en Postman hacer las siguientes peticiones GET: 

```
http://localhost:3000/extra-reports/html-report
```
