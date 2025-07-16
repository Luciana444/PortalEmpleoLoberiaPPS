//Router principal del backend. Agrupa y monta los subrouters de cada módulo funcional del sistema.
// Este archivo permite estructurar las rutas de forma modular y clara.


import express from 'express';
import { usuarioRoutes } from './usuarioRoutes.js';// Rutas relacionadas a operaciones sobre usuarios
import { authRoutes } from './authRoutes.js'; // Rutas relacionadas a autenticación y login
import { ciudadanoRoutes } from './ciudadanoRoutes.js';
import { empleadorRoutes } from './empleadorRoutes.js';

// Inicializa un nuevo router de Express para actuar como contenedor de rutas del proyecto
export const router = express.Router();

// Monta las rutas de usuario bajo el path /api/usuario
// Ej: GET /api/usuario/:id, POST /api/usuario, etc.
router.use('/usuario',usuarioRoutes);

// Monta las rutas de autenticación bajo el path /api/auth
// Ej: POST /api/auth/login, POST /api/auth/register, etc.
router.use('/auth',authRoutes)

router.use('/ciudadano', ciudadanoRoutes);

router.use('/empresa', empleadorRoutes);