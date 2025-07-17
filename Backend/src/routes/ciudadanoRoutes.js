import express from 'express';
// Controllers: funciones que contienen la lógica de negocio
import { cancelarPostulacion, generarPdf, postularseAOferta, subirCV } from '../controllers/ciudadanoController.js';
// Middlewares de seguridad y autorización
import {authMiddleware} from '../middlewares/authMiddleware.js'
import {onlyCiudadano} from '../middlewares/onlyCiudadano.js'
// Middleware para manejar la subida de archivos con Multer configurado
import subirCv from '../middlewares/upload.js';
import { actualizarPerfilCiudadano, obtenerPerfilCompleto, obtenerPostulaciones,buscarOfertasConFiltros} from '../controllers/ciudadanoController.js';


// Creamos el router para las rutas relacionadas con ciudadanos
export const ciudadanoRoutes = express.Router();



//=========================================================
// Endpoint para subir archivo CV (PDF) al perfil
//=========================================================

/**
 * @swagger
 * /ciudadano/upload_cv:

 *   put:
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



ciudadanoRoutes.put('/upload_cv',authMiddleware, onlyCiudadano, subirCv.single('cv'),subirCV);



//=====================================================================
// ----------------------------------------------------
// ACTUALIZAR PERFIL DEL CIUDADANO - Endpoint PUT
// ----------------------------------------------------
// Ruta para actualizar datos del perfil del ciudadano

/**
 * @swagger
 * /ciudadano/actualizar/perfil:
 *   patch:
 *     summary: Actualizar datos del perfil del ciudadano (incluye opcionalmente capacitación y experiencia laboral)
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
 *               nombre_capacitacion:
 *                 type: string
 *                 description: Nombre de una capacitación a registrar (opcional)
 *               nombre_empresa:
 *                 type: string
 *                 description: Experiencia laboral - nombre de la empresa
 *               desde:
 *                 type: string
 *                 format: date
 *                 description: Experiencia laboral - fecha de inicio
 *               hasta:
 *                 type: string
 *                 format: date
 *                 description: Experiencia laboral - fecha de fin (opcional)
 *               comentario:
 *                 type: string
 *                 description: Experiencia laboral - comentarios (opcional)
 *     responses:
 *       200:
 *         description: Perfil actualizado correctamente
 *       400:
 *         description: Datos inválidos o campos faltantes
 *       401:
 *         description: Usuario no autenticado
 *       500:
 *         description: Error interno al actualizar el perfil
 */



ciudadanoRoutes.patch('/actualizar/perfil',authMiddleware,onlyCiudadano,subirCv.single('cv'),actualizarPerfilCiudadano);


//============================================================================
//end point  para generar cv
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



//=============================================================================
// End point para  obtener  perfil del ciudadano
//========================================================================

/**
 * @swagger
 * /ciudadano/traer/perfil:
 *   get:
 *     summary: Obtener el perfil completo del ciudadano autenticado
 *     tags: [Ciudadano]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil completo del ciudadano obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                 apellido:
 *                   type: string
 *                 email:
 *                   type: string
 *                 dni:
 *                   type: string
 *                 cuil:
 *                   type: string
 *                 fecha_nacimiento:
 *                   type: string
 *                   format: date
 *                 telefono:
 *                   type: string
 *                 calle:
 *                   type: string
 *                 numero:
 *                   type: string
 *                 piso:
 *                   type: string
 *                 dpto:
 *                   type: string
 *                 localidad:
 *                   type: string
 *                 provincia:
 *                   type: string
 *                 pais:
 *                   type: string
 *                 nivel_educativo:
 *                   type: string
 *                 esta_cursando_carrera:
 *                   type: boolean
 *                 carrera_en_curso:
 *                   type: string
 *                 situacion_laboral:
 *                   type: string
 *                 tiene_emprendimiento:
 *                   type: string
 *                 discapacidad:
 *                   type: string
 *                 foto:
 *                   type: string
 *                   description: URL de la imagen de perfil
 *                 cv_url:
 *                   type: string
 *                   description: URL del CV adjunto
 *       401:
 *         description: Usuario no autenticado
 *       404:
 *         description: Perfil no encontrado
 *       500:
 *         description: Error al obtener el perfil
 */


ciudadanoRoutes.get('/traer/perfil', authMiddleware, onlyCiudadano, obtenerPerfilCompleto);

//=====================================================================

// end point filtrar ofertas

/**
 * @swagger
 * /ciudadano/filtrar/ofertas:
 *   get:
 *     summary: Buscar ofertas laborales con filtros (solo ciudadano)
 *     tags:
 *       - Ciudadano - Ofertas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: modalidad
 *         in: query
 *         required: false
 *         description: "Modalidad de trabajo (ej: Tiempo completo, Medio tiempo, etc.)"
 *         schema:
 *           type: string
 *       - name: lugar_trabajo
 *         in: query
 *         required: false
 *         description: "Lugar de trabajo (Presencial, Remoto, Mixto)"
 *         schema:
 *           type: string
 *       - name: descripcion
 *         in: query
 *         required: false
 *         description: "Texto a buscar en la descripción de la oferta"
 *         schema:
 *           type: string
 *       - name: puesto_requerido
 *         in: query
 *         required: false
 *         description: "Título o puesto buscado"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Lista de ofertas laborales que coinciden con los filtros"
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
 *       401:
 *         description:" No autorizado (token faltante o inválido)"
 *       500:
 *         description: "Error interno del servidor"
 */


ciudadanoRoutes.get('/filtrar/ofertas', authMiddleware,onlyCiudadano, buscarOfertasConFiltros);

//===============================================================
//end point traer postulaciones

/**
 * @swagger
 * /ciudadano/traer/postulaciones:
 *   get:
 *     summary: Obtener postulaciones del ciudadano autenticado
 *     tags:
 *       - Ciudadano - Postulaciones
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de postulaciones realizadas por el ciudadano
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
 *                     description: ID de la postulación
 *                   id_oferta:
 *                     type: string
 *                     format: uuid
 *                   fecha_postulacion:
 *                     type: string
 *                     format: date-time
 *                   estado:
 *                     type: string
 *                     enum: [pendiente, aceptado, rechazado]
 *                   mensaje:
 *                     type: string
 *                   cv_url:
 *                     type: string
 *                   leido_por_empresa:
 *                     type: boolean
 *                   puesto_requerido:
 *                     type: string
 *                   nombre_empresa:
 *                     type: string
 *       401:
 *         description: No autorizado (falta token o token inválido)
 *       500:
 *         description: Error interno del servidor
 */


ciudadanoRoutes.get('/traer/postulaciones', authMiddleware, onlyCiudadano, obtenerPostulaciones);

//==========================================================
// End point postularse a ofertas

/**
 * @swagger
 * /ciudadano/ofertas/{id}/postular:
 *   post:
 *     summary: Postularse a una oferta laboral
 *     tags:
 *       - Ciudadano - Postulaciones
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la oferta laboral
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               mensaje:
 *                 type: string
 *                 description: Mensaje opcional del ciudadano
 *               cv:
 *                 type: string
 *                 format: binary
 *                 description: Archivo del CV (PDF, DOCX, etc.)
 *     responses:
 *       200:
 *         description: Postulación realizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Postulacion exitosa
 *       400:
 *         description: Error en la solicitud (ID faltante, oferta inactiva o ya postulado)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ya esta postulado
 *       401:
 *         description: No autorizado (token inválido o faltante)
 *       500:
 *         description: Error interno al registrar la postulación
 */


ciudadanoRoutes.post('/ofertas/:id/postular',authMiddleware,onlyCiudadano,subirCv.single('cv'),postularseAOferta);

ciudadanoRoutes.delete('/ofertas/:id/cancelar_postulacion',authMiddleware,onlyCiudadano,cancelarPostulacion);

export default ciudadanoRoutes;



