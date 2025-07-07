import express from 'express';
// Controllers: funciones que contienen la lógica de negocio
import { generarPdf, subirCV } from '../controllers/ciudadanoController.js';
// Middlewares de seguridad y autorización
import {authMiddleware} from '../middlewares/authMiddleware.js'
import {onlyCiudadano} from '../middlewares/onlyCiudadano.js'
// Middleware para manejar la subida de archivos con Multer configurado
import subirCv from '../middlewares/upload.js';
import { actualizarPerfilCiudadano } from '../controllers/ciudadanoController.js';
import{obtenerPerfilCompleto} from '../controllers/ciudadanoController.js';

// Creamos el router para las rutas relacionadas con ciudadanos
export const ciudadanoRoutes = express.Router();



//=========================================================
// Endpoint para subir archivo CV (PDF) al perfil
//=========================================================

/**
 * @swagger
 * tags:
 *   name: Subir cv
 *   description: Endpoints para subir el curriculum vitae
 */
/**
 * @swagger
 * /ciudadano/upload_cv:

 *   post:
 *     summary: Subir archivo CV (PDF) al perfil del ciudadano
 *     tags: [Ciudadano]
 *     security:
 *       - bearerAuth: []  # Requiere token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - cv
 *             properties:
 *               cv:
 *                 type: string
 *                 format: binary
 *                 description: Archivo CV en formato PDF
 *     responses:
 *       200:
 *         description: CV subido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 url:
 *                   type: string
 *       400:
 *         description: Falta el archivo CV
 *       403:
 *         description: No autorizado para realizar esta acción
 *       500:
 *         description: Error interno al subir el CV
 */



// Ruta para subir CV en formato PDF
// Middlewares ejecutados en orden:
// 1) authMiddleware: asegura que el usuario esté autenticado
// 2) onlyCiudadano: asegura que el usuario sea del tipo "ciudadano"
// 3) subirCv.single('cv'): procesa el archivo enviado en el campo 'cv' (Multer)
// 4) subirCV: controller que maneja la lógica de guardar la URL en DB y devolver respuesta



ciudadanoRoutes.put('/importar_cv',authMiddleware, onlyCiudadano, subirCv.single('cv'),subirCV);


// Ruta para actualizar datos del perfil del ciudadano
// En este caso no tiene middlewares de autenticación ni autorización — debería tenerlos
// para evitar que cualquiera actualice cualquier perfil (revisar eso)
// Aquí solo se llama al controller actualizarPerfilCiudadano

//=====================================================================
// ----------------------------------------------------
// ACTUALIZAR PERFIL DEL CIUDADANO - Endpoint PUT
// ----------------------------------------------------
/**
 * @swagger
 * tags:
 *   name: Actualizar perfil del ciudadano
 *   description: Endpoints para actualizar el perfil del ciudadano
 */
/**
 * @swagger
 * /ciudadano/actualizar/perfil:
 *   put:
 *     summary: Actualizar datos del perfil del ciudadano
 *     tags: [Ciudadano]
 *     security:
 *       - bearerAuth: []  # Autenticación con JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               fecha_nacimiento:
 *                 type: string
 *                 format: date
 *               telefono:
 *                 type: string
 *               email:
 *                 type: string
 *               dni:
 *                 type: string
 *               cuil:
 *                 type: string
 *               calle:
 *                 type: string
 *               numero:
 *                 type: string
 *               piso:
 *                 type: string
 *               dpto:
 *                 type: string
 *               localidad:
 *                 type: string
 *               provincia:
 *                 type: string
 *               pais:
 *                 type: string
 *               nivel_educativo:
 *                 type: string
 *               esta_cursando_carrera:
 *                 type: boolean
 *               carrera_en_curso:
 *                 type: string
 *               situacion_laboral:
 *                 type: string
 *               tiene_emprendimiento:
 *                 type: string
 *               discapacidad:
 *                 type: string
 *               cv_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Perfil actualizado correctamente
 *       400:
 *         description: Datos inválidos o campos faltantes
 *       500:
 *         description: Error interno al actualizar el perfil
 */



ciudadanoRoutes.patch('/actualizar/perfil',authMiddleware,onlyCiudadano, actualizarPerfilCiudadano);

//============================================================================
//end point generar cv
//============================================================================

/**
 * @swagger
 * /ciudadano/generar_cv:
 *   get:
 *     summary: Genera y devuelve el CV del usuario autenticado en formato PDF
 *     tags:
 *       - Ciudadano
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: PDF generado correctamente y enviado en la respuesta
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: No se encontró el ID del usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Falta el id del usuario
 *       500:
 *         description: Error interno al generar el PDF
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al crear pdf
 */


ciudadanoRoutes.get('/generar_cv',authMiddleware, onlyCiudadano, generarPdf);

ciudadanoRoutes.get('/traer/perfil', authMiddleware, onlyCiudadano, obtenerPerfilCompleto);

export default ciudadanoRoutes;



