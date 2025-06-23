// Módulo de configuración de la conexión a la base de datos PostgreSQL utilizando la librería 'postgres'.
// La cadena de conexión se obtiene de las variables de entorno definidas en un archivo .env.

import postgres from "postgres"; // Cliente SQL liviano para PostgreSQL (sin ORM)
import dotenv from 'dotenv';  // Carga variables de entorno desde un archivo .env

dotenv.config(); // Inicializa la lectura de variables de entorno

const connectionString = process.env.DATABASE_URI; // URI de conexión a la base de datos definida en .env

// Inicializa la conexión a PostgreSQL utilizando la URI proporcionada.
// Devuelve una instancia del cliente que se utilizará en los repositorios para realizar consultas.
const sql = postgres(connectionString);

// Exporta la instancia de conexión para ser reutilizada en todo el proyecto.
export default sql;



