import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { onlyEmpresa } from '../middlewares/onlyEmpresa.js';
import { actualizarPerfilEmpresa, obtenerDatosEmpresa } from '../controllers/empleadorController.js';

export const empleadorRoutes = express.Router();

//=======================================================================================
//End point para actualizar perfil  de la empresa
//  (si es la primera vez sobreescribe los valores  que fueron creados al iniciar sesion como usuario)
//===========================================================================================
/**
 * @swagger
 * /empleador/actualizar/perfil:
 *   patch:
 *     summary: Actualiza el perfil de una empresa
 *     tags: [Empleador]
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
 *               telefono:
 *                 type: string
 *               direccion:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               sitio_web:
 *                 type: string
 *             example:
 *               nombre_empresa: "Tech Solutions SRL"
 *               telefono: "123456789"
 *               direccion: "Av. Siempre Viva 742"
 *               descripcion: "Empresa dedicada al desarrollo de software"
 *               sitio_web: "https://techsolutions.com"
 *     responses:
 *       200:
 *         description: Perfil actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */

empleadorRoutes.patch('/actualizar/perfil',authMiddleware,onlyEmpresa,actualizarPerfilEmpresa);


//==============================================================================
// End point para obtener datos de la empresa
//=============================================================================

/**
 * @swagger
 * /empleador/datos:
 *   get:
 *     summary: Obtiene los datos del perfil de la empresa autenticada
 *     tags: [Empleador]
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
 *                 id_usuario:
 *                   type: string
 *                 nombre_empresa:
 *                   type: string
 *                 telefono:
 *                   type: string
 *                 direccion:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 sitio_web:
 *                   type: string
 *                 email:
 *                   type: string
 *                 cuit:
 *                   type: string
 *                 rubro:
 *                   type: string
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error al obtener los datos
 */

empleadorRoutes.get('/datos',authMiddleware,onlyEmpresa,obtenerDatosEmpresa);


export default empleadorRoutes;