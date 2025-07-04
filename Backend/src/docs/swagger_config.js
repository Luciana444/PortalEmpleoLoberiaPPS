

import swaggerJSDoc from 'swagger-jsdoc';

// Definición general de la API (esto aparecerá en Swagger UI)
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Portal de Empleo - API REST',
    version: '1.0.0',
    description: 'Documentación generada con Swagger para el backend del Portal de Empleo',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Servidor local de desarrollo',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

// 📂 Opciones para decirle a Swagger dónde están las rutas con anotaciones
const swaggerOptions = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'], // <-- ajustá esta ruta si tenés subcarpetas o más rutas
};

// Exportar el resultado para usarlo en index.js
export const swaggerSpec = swaggerJSDoc(swaggerOptions);
