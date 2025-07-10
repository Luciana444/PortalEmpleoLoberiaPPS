// app.js
import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes.js'; // Ajustá si tu ruta está en otra carpeta
import usuarioRoutes from './src/routes/usuarioRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/usuario', usuarioRoutes); 

export default app;