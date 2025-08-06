import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { onlyAdmin } from '../middlewares/onlyAdmin.js';
import { getPostulacionesTotales,getOfertasLaborales, getOfertasTotales,getResumenUsuarios,getReporteVisitas, generarReporteMetricas, getListaCiudadanos, autorizarOferta, getListaEmpresas, autorizarEmpresa } from '../controllers/adminController.js';


export const adminRoutes = express.Router();

// Endpoint para obtener la cantidad total de postulaciones (solo admin)
/**
 * @swagger
 * /admin/postulaciones_totales:
 *   get:
 *     summary: Obtener la cantidad total de postulaciones registradas
 *     tags:
 *       - Administrador - Reportes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cantidad total de postulaciones obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_postulaciones:
 *                   type: integer
 *                   example: 152
 *       401:
 *         description: No autorizado - Token ausente o inválido
 *       403:
 *         description: Acceso prohibido - Requiere rol de administrador
 *       500:
 *         description: Error interno del servidor
 */

adminRoutes.get('/postulaciones_totales',authMiddleware,onlyAdmin, getPostulacionesTotales);


//=============================================================
// Endpoint para que el administrador obtenga las ofertas laborales
/**
 * @swagger
 * /admin/ofertas/laborales:
 *   get:
 *     summary: Obtener todas las ofertas laborales, con posibilidad de filtrar por estado de publicación
 *     tags:
 *       - Administrador - Ofertas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: estado_publicacion
 *         schema:
 *           type: string
 *           enum: [pendiente, aprobada, rechazada, finalizada]
 *         required: false
 *         description: Filtrar ofertas por su estado de publicación
 *     responses:
 *       200:
 *         description: Lista de ofertas laborales obtenida correctamente
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
 *                   titulo:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   estado_publicacion:
 *                     type: string
 *                     enum: [pendiente, aprobada, rechazada, finalizada]
 *                   fecha_creacion:
 *                     type: string
 *                     format: date
 *                   empresa:
 *                     type: string
 *                     description: Nombre o identificador de la empresa
 *       401:
 *         description: No autorizado - Token ausente o inválido
 *       403:
 *         description: Acceso prohibido - Requiere rol de administrador
 *       500:
 *         description: Error interno del servidor
 */


adminRoutes.get('/ofertas/laborales',authMiddleware,onlyAdmin,getOfertasLaborales);

//=============================================================0

// Endpoint para obtener la cantidad total de ofertas laborales
/**
 * @swagger
 * /admin/ofertas_totales:
 *   get:
 *     summary: Obtener la cantidad total de ofertas laborales
 *     tags:
 *       - Administrador - Ofertas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cantidad total de ofertas obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 124
 *       401:
 *         description: No autorizado - Token ausente o inválido
 *       403:
 *         description: Acceso prohibido - Requiere rol de administrador
 *       500:
 *         description: Error interno del servidor
 */

adminRoutes.get('/ofertas_totales',authMiddleware,onlyAdmin,getOfertasTotales);

//======================================================

// Endpoint para obtener un resumen de usuarios por tipo
/**
 * @swagger
 * /admin/usuarios/resumen:
 *   get:
 *     summary: Obtener un resumen de usuarios registrados por tipo
 *     tags:
 *       - Administrador - Usuarios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resumen de usuarios obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ciudadanos:
 *                   type: integer
 *                   example: 150
 *                 empresas:
 *                   type: integer
 *                   example: 45
 *                 administradores:
 *                   type: integer
 *                   example: 3
 *       401:
 *         description: No autorizado - Token ausente o inválido
 *       403:
 *         description: Acceso prohibido - Requiere rol de administrador
 *       500:
 *         description: Error interno del servidor
 */

adminRoutes.get('/usuarios/resumen', authMiddleware, onlyAdmin, getResumenUsuarios);

//============================================================

// Endpoint para obtener el reporte de visitas
/**
 * @swagger
 * /admin/ver/visitas:
 *   get:
 *     summary: Obtener reporte de visitas al portal
 *     tags:
 *       - Administrador - Reportes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reporte de visitas obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_visitas:
 *                   type: integer
 *                   example: 1250
 *                 visitas_por_dia:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       fecha:
 *                         type: string
 *                         format: date
 *                         example: "2025-08-05"
 *                       cantidad:
 *                         type: integer
 *                         example: 50
 *       401:
 *         description: No autorizado - Token ausente o inválido
 *       403:
 *         description: Acceso prohibido - Requiere rol de administrador
 *       500:
 *         description: Error interno del servidor
 */

adminRoutes.get('/ver/visitas',authMiddleware,onlyAdmin,getReporteVisitas);
//=================================================


// Endpoint para generar el reporte de métricas del sistema
/**
 * @swagger
 * /admin/generar_reporte:
 *   get:
 *     summary: Generar y descargar el reporte de métricas del sistema
 *     tags:
 *       - Administrador - Reportes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reporte generado correctamente
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: No autorizado - Token ausente o inválido
 *       403:
 *         description: Acceso prohibido - Requiere rol de administrador
 *       500:
 *         description: Error interno al generar el reporte
 */

adminRoutes.get('/generar_reporte',authMiddleware,onlyAdmin,generarReporteMetricas);


//================================================================

// Endpoint para obtener la lista completa de ciudadanos registrados
/**
 * @swagger
 * /admin/ciudadanos:
 *   get:
 *     summary: Obtener lista completa de ciudadanos registrados
 *     tags:
 *       - Administrador - Usuarios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de ciudadanos obtenida correctamente
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
 *                   nombre:
 *                     type: string
 *                   apellido:
 *                     type: string
 *                   email:
 *                     type: string
 *                   telefono:
 *                     type: string
 *                   dni:
 *                     type: string
 *       401:
 *         description: No autorizado - Token ausente o inválido
 *       403:
 *         description: Acceso prohibido - Requiere rol de administrador
 *       500:
 *         description: Error interno al obtener la lista de ciudadanos
 */

adminRoutes.get('/ciudadanos',authMiddleware,onlyAdmin,getListaCiudadanos);

//================================================

// Endpoint para obtener la lista completa de empresas registradas
/**
 * @swagger
 * /admin/empresas:
 *   get:
 *     summary: Obtener lista completa de empresas registradas
 *     tags:
 *       - Administrador - Usuarios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de empresas obtenida correctamente
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
 *                   nombre:
 *                     type: string
 *                   cuit:
 *                     type: string
 *                   email:
 *                     type: string
 *                   telefono:
 *                     type: string
 *                   rubro:
 *                     type: string
 *       401:
 *         description: No autorizado - Token ausente o inválido
 *       403:
 *         description: Acceso prohibido - Requiere rol de administrador
 *       500:
 *         description: Error interno al obtener la lista de empresas
 */


adminRoutes.get('/empresas',authMiddleware,onlyAdmin,getListaEmpresas);
//=======================================================

/**
 * @swagger
 * /admin/ofertas/{id}/autorizar:
 *   put:
 *     summary: Autorizar o rechazar una oferta laboral
 *     tags:
 *       - Administrador - Ofertas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la oferta laboral a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - estado_publicacion
 *             properties:
 *               estado_publicacion:
 *                 type: string
 *                 enum: [pendiente, aprobada, rechazada]
 *                 description: Nuevo estado de publicación de la oferta
 *     responses:
 *       200:
 *         description: Estado de publicación de la oferta actualizado correctamente
 *       400:
 *         description: Faltan datos en la solicitud
 *       401:
 *         description: No autorizado - Token ausente o inválido
 *       403:
 *         description: Acceso prohibido - Requiere rol de administrador
 *       500:
 *         description: Error interno al actualizar el estado de publicación
 */

adminRoutes.put('/ofertas/:id/autorizar',authMiddleware,onlyAdmin,autorizarOferta);

//=======================================================

/**
 * @swagger
 * /admin/empresas/{id}/autorizar:
 *   put:
 *     summary: Autorizar o rechazar una empresa
 *     tags:
 *       - Administrador - Empresas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la empresa a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - estado_publicacion
 *             properties:
 *               estado_publicacion:
 *                 type: string
 *                 enum: [pendiente, aprobada, rechazada]
 *                 description: Nuevo estado de aprobación de la empresa
 *     responses:
 *       200:
 *         description: Estado de aprobación de la empresa actualizado correctamente
 *       400:
 *         description: Faltan datos en la solicitud
 *       401:
 *         description: No autorizado - Token ausente o inválido
 *       403:
 *         description: Acceso prohibido - Requiere rol de administrador
 *       500:
 *         description: Error interno al actualizar la aprobación de la empresa
 */

adminRoutes.put('/empresas/:id/autorizar',authMiddleware,onlyAdmin,autorizarEmpresa);

export default adminRoutes;