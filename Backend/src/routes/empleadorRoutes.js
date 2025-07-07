import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { onlyEmpresa } from '../middlewares/onlyEmpresa.js';
import { actualizarPerfilEmpresa, obtenerDatosEmpresa } from '../controllers/empleadorController.js';

export const empleadoRoutes = express.Router();

//===============================================
//end-point para  actualizar perfil  de empresa
//===============================================

/**
 * @swagger
 * /empleado/actualizar/perfil:
 *   patch:
 *     summary: Actualizar perfil de empresa autenticada
 *     tags: [Empresa]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_empresa:
 *                 type: string
 *               email_contacto:
 *                 type: string
 *                 format: email
 *               sitio_web:
 *                 type: string
 *               cuit:
 *                 type: string
 *               rubro:
 *                 type: string
 *               telefono:
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
 *     responses:
 *       200:
 *         description: Perfil actualizado correctamente
 *       400:
 *         description: Error de validación o falta de datos obligatorios
 *       500:
 *         description: Error interno al actualizar el perfil
 */


empleadoRoutes.patch('/actualizar/perfil',authMiddleware,onlyEmpresa,actualizarPerfilEmpresa);


//=======================================================================
// end point para obtener los datos de la empresa
//======================================================================

/**
 * @swagger
 * /empleado/datos:
 *   get:
 *     summary: Obtener los datos de la empresa autenticada
 *     tags: [Empresa]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos de la empresa obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre_empresa:
 *                   type: string
 *                 email_contacto:
 *                   type: string
 *                   format: email
 *                 sitio_web:
 *                   type: string
 *                 cuit:
 *                   type: string
 *                 rubro:
 *                   type: string
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
 *                 logo:
 *                   type: string
 *                   description: URL del logo (si está disponible)
 *       404:
 *         description: ID del usuario no encontrado
 *       500:
 *         description: Error al obtener los datos de la empresa
 */

empleadoRoutes.get('/datos',authMiddleware,onlyEmpresa,obtenerDatosEmpresa);


export default empleadoRoutes;