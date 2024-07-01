# TP2-grupo17

- Heroku en el usuario de mcmustillo@gmail.com, proyecto "tp-grupo17"
- JawsDB MySQL Addon

## Descripción del Proyecto

Este proyecto consiste en una aplicación CRUD (Crear, Leer, Actualizar, Borrar) desarrollada utilizando Node.js y Express para el backend, MySQL como base de datos y un frontend sencillo en HTML, CSS y JavaScript. La aplicación está desplegada en un servidor online y el código está disponible en un repositorio de GitHub.

## Cumplimiento de los Criterios de Evaluación

### Base de Datos

- **MySQL**: La base de datos utilizada es MySQL.
- **Mínimo de 4 tablas**: La base de datos contiene al menos 4 tablas (`users`, `posts`, `comments`, `categories`).
- **4 tipos de datos diferentes**: Las tablas contienen diversos tipos de datos como `INT`, `VARCHAR`, `TEXT`, `TIMESTAMP`.
- **Relación "uno a muchos"**: Existen relaciones "uno a muchos" entre las tablas, por ejemplo, un `user` puede tener múltiples `posts` y `comments`.

### Servidor y Operaciones CRUD

- **POST (Alta)**: Se puede realizar la creación de nuevos registros en las tablas (`users`, `posts`, `comments`, `categories`) mediante solicitudes POST.
- **PUT (Modificaciones)**: Se pueden modificar los registros existentes utilizando solicitudes PUT.
- **GET (Acceso a registros)**: Se puede acceder a los registros de las tablas mediante solicitudes GET.
- **DELETE (Borrado físico)**: Se pueden eliminar registros de las tablas utilizando solicitudes DELETE.

### Despliegue y Repositorio

- **Servidor online**: La aplicación está desplegada en Heroku y accesible online.
- **Repositorio Git**: El código del proyecto está disponible en un repositorio de GitHub.

### Autenticación

- **Token de autenticación**: Se ha implementado autenticación utilizando JWT (JSON Web Tokens) para asegurar las rutas protegidas.

### Integración Frontend y Backend

- **Frontend**: El frontend permite la interacción con el backend mediante formularios y botones, proporcionando una interfaz de usuario para realizar operaciones CRUD.
- **Backend**: El backend maneja las solicitudes y realiza operaciones en la base de datos, devolviendo respuestas al frontend.

## Tecnologías Utilizadas

- **Backend**: Node.js, Express
- **Base de Datos**: MySQL
- **Frontend**: HTML, CSS, JavaScript
- **Despliegue**: Heroku
- **Control de Versiones**: Git, GitHub

## Instrucciones para Ejecutar el Proyecto Localmente

1. Clonar el repositorio:
   ```sh
   git clone https://github.com/mcmust/TP2-grupo17
   cd TP2-grupo17
   ```

2. Instalar dependencias:
   ```sh
   npm install
   ```

3. Configurar variables de entorno:  
   - Crear un archivo `.env` en la raíz del proyecto y añadir las siguientes variables:
     ```env
     JAWSDB_URL=<URL_DE_LA_BASE_DE_DATOS>
     ```

4. Iniciar el servidor:
   ```sh
   node server.js
   ```

5. Acceder a la aplicación:  
   Abrir el navegador y navegar a [http://localhost:5000](http://localhost:5000).

## Despliegue

La aplicación está desplegada en Heroku y se puede acceder a través del siguiente enlace:  
[Enlace a la Aplicación en Heroku](https://tp-grupo17-9a48f7f37a7c.herokuapp.com/)

## Repositorio

El código fuente del proyecto está disponible en el siguiente repositorio de GitHub:  
[Enlace al Repositorio de GitHub](https://github.com/mcmust/TP2-grupo17)

## Contacto

Para cualquier consulta o sugerencia, por favor contactar a [mcmustillo@gmail.com](mailto:mcmustillo@gmail.com).