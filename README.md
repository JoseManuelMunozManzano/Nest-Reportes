# NESTJS + REPORTES: GENERA PDFs DESDE NODE

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

Del curso de Fernando Herrera: https://cursos.devtalles.com/courses/nestjs-reportes

## Secciones

### 1.Preparación de proyecto

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

En la carpeta `postman` están todas las peticiones http.
