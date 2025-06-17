import postgres from "postgres";
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URI;

const sql = postgres(connectionString);


export default sql;