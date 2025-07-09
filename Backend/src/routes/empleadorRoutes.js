import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { onlyEmpresa } from '../middlewares/onlyEmpresa.js';
import { actualizarPerfilEmpresa, obtenerDatosEmpresa,obtenerOfertasEmpresa,traerOfertasActivas } from '../controllers/empleadorController.js';

export const empleadorRoutes = express.Router();

//=======================================================================================
//End point para actualizar perfil  de la empresa
//  (si es la primera vez sobreescribe los valores  que fueron creados al iniciar sesion como usuario)
//===========================================================================================
/**
 * @swagger
 * /empresa/actualizar/perfil:
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
 *               email_contacto:
 *                 type: string
 *               logo:
 *                 type: string
 *                 format: uri
 *               sitio_web:
 *                 type: string
 *                 format: uri
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
 *             example:
 *               nombre_empresa: "Tech Solutions SRL"
 *               email_contacto: "contacto@tech.com"
 *               logo: "https://example.com/logo.png"
 *               sitio_web: "https://techsolutions.com"
 *               cuit: "30712345678"
 *               rubro: "Desarrollo de software"
 *               telefono: "123456789"
 *               calle: "Av. Siempre Viva"
 *               numero: "742"
 *               piso: "1"
 *               dpto: "B"
 *               localidad: "Springfield"
 *               provincia: "Buenos Aires"
 *               pais: "Argentina"
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
 * /empresa/datos:
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
 *                 email_contacto:
 *                   type: string
 *                 logo:
 *                   type: string
 *                   format: uri
 *                 sitio_web:
 *                   type: string
 *                   format: uri
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
 *               example:
 *                 id_usuario: "1"
 *                 nombre_empresa: "Tech Solutions"
 *                 email_contacto: "contacto@tech.com"
 *                 logo: "https://example.com/logo.png"
 *                 sitio_web: "https://techsolutions.com"
 *                 cuit: "30712345678"
 *                 rubro: "Software"
 *                 telefono: "123456789"
 *                 calle: "Av. Siempre Viva"
 *                 numero: "742"
 *                 piso: "1"
 *                 dpto: "B"
 *                 localidad: "Springfield"
 *                 provincia: "Buenos Aires"
 *                 pais: "Argentina"
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error del servidor
 */

empleadorRoutes.get('/datos',authMiddleware,onlyEmpresa,obtenerDatosEmpresa);

empleadorRoutes.get('/traer/ofertas', authMiddleware,onlyEmpresa,obtenerOfertasEmpresa);

empleadorRoutes.get('/ofertas/activas', traerOfertasActivas);

export default empleadorRoutes;