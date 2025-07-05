// Define las rutas HTTP relacionadas con la entidad "Usuario".
// Cada ruta se conecta con su correspondiente controlador en la capa de lógica de negocio.


import express from 'express';
import { getAllUsuarios } from '../controllers/usuarioController.js';


// Inicializa un router específico para el módulo de usuarios
export const usuarioRoutes = express.Router();

//===================================================================
// end point : obtener todos los usuarios
//===================================================================

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


//====================================
// End POint : Subir foto de perfil y logo de empresas
//======================================



import { subirFotoPerfil } from '../controllers/usuarioController.js';
import upload from '../config/multer.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';



/**
 * @swagger
 * /usuario/foto/perfil:
 *   post:
 *     summary: Sube la foto de perfil del usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               foto:
 *                 type: string
 *                 format: binary
 *               tipoUsuario:
 *                 type: string
 *                 example: ciudadano
 *     responses:
 *       200:
 *         description: Foto de perfil subida exitosamente
 *       400:
 *         description: Error al subir la foto de perfil
 *       401:
 *         description: No autorizado
 */

usuarioRoutes.post('/foto/perfil',authMiddleware, upload.single('foto'), subirFotoPerfil);
export default usuarioRoutes;
