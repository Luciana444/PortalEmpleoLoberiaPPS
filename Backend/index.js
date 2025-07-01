
// index.js
// Punto de entrada de la aplicación backend.
// Configura el servidor Express, los middlewares globales, las rutas base y la documentación Swagger.


import express from 'express';
import {router} from './src/routes/router.js';
import cors from 'cors';
import path from 'path';
// Documentación Swagger (OpenAPI)
import { swaggerSpec } from './src/docs/swagger_config.js';
import swaggerUi from 'swagger-ui-express';

// Inicializa la instancia principal de Express
const app = express();
// Middleware que permite peticiones cross-origin desde otros orígenes (CORS)
app.use(cors({
  origin: 'http://localhost:4200',
  credentials:true
}));

// Middleware global para parsear cuerpos JSON en las solicitudes entrantes
app.use(express.json());


// Punto de montaje de la documentación Swagger en la ruta /api-docs
// Permite consultar y probar los endpoints de forma visual
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Inicializa el servidor en el puerto 3000 y muestra un mensaje de confirmación en consola
app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});

// Punto de montaje de todas las rutas definidas en el router principal
// Las rutas se agrupan bajo el prefijo /api
app.use('/api',router);


// Mensaje adicional para confirmar que el backend está funcionando
console.log("funcionando");


app.use('/foto', express.static(path.resolve('perfiles/fotos')));



