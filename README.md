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

Una vez grabada la data, confirmarlo con la siguiente consulta: `SELECT * FROM EMPLOYEES;`

En la carpeta `report-server/postman` están todas las peticiones http.
