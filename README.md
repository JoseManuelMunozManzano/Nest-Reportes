# NESTJS + REPORTES: GENERA PDFs DESDE NODE

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

Del curso de Fernando Herrera: https://cursos.devtalles.com/courses/nestjs-reportes

## Secciones

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

En la carpeta `report-server/sql` tenemos los SQL con la carga inicial de nuestra BD. Hay que llevarlo a `pgAdmin` y ejecutar esas consultas para dar de alta la data.

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
3. Clonar `env.template` y renombrar a `.env` y completar las variables de entorno
4. Levantar la BBDD `docker compose up -d` en mi Raspberry Pi
5. Generar el Prisma client `npx prisma generate`
6. Ejecutar proyecto `npm run start:dev`
