// Define las rutas HTTP relacionadas con la entidad "Usuario".
// Cada ruta se conecta con su correspondiente controlador en la capa de lógica de negocio.


import express from 'express';
import { getAllUsuarios } from '../controllers/usuarioController.js';

// Inicializa un router específico para el módulo de usuarios
export const usuarioRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para gestionar usuarios
 */

/**
 * @swagger
 * /usuario:
 *   get:
 *     summary: Obtener todos los usuarios registrados
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     description: ID único del usuario
 *                   nombre:
 *                     type: string
 *                     description: Nombre del usuario
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: Email del usuario
 */


usuarioRoutes.get('/',getAllUsuarios);

