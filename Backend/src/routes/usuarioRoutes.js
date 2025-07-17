// Define las rutas HTTP relacionadas con la entidad "Usuario".
// Cada ruta se conecta con su correspondiente controlador en la capa de lógica de negocio.


import express from 'express';
import { eliminarCuenta, getAllUsuarios, obtenerDetallesOferta } from '../controllers/usuarioController.js';


// Inicializa un router específico para el módulo de usuarios
export const usuarioRoutes = express.Router();

//===================================================================
// end point : obtener todos los usuarios
//===================================================================


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

//================================================
//End point obtener detalles de la oferta
/**
 * @swagger
 * /usuario/ofertas/{id}:
 *   get:
 *     summary: Obtener detalles de una oferta laboral y su empresa
 *     tags:
 *       - Público - Ofertas
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la oferta laboral
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Detalles de la oferta y la empresa asociada
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
 *                   puesto_requerido:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   modalidad:
 *                     type: string
 *                   lugar_trabajo:
 *                     type: string
 *                   fecha_publicacion:
 *                     type: string
 *                     format: date-time
 *                   nombre_empresa:
 *                     type: string
 *                   rubro:
 *                     type: string
 *                   localidad:
 *                     type: string
 *                   email:
 *                     type: string
 *       400:
 *         description: Falta el ID de la oferta
 *       404:
 *         description: Oferta o empresa no encontrada
 *       500:
 *         description: Error interno del servidor
 */


usuarioRoutes.get('/ofertas/:id',obtenerDetallesOferta);



usuarioRoutes.delete('/eliminar_cuenta',authMiddleware,eliminarCuenta);


export default usuarioRoutes;
