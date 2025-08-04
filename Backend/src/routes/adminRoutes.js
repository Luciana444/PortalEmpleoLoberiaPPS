import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { onlyAdmin } from '../middlewares/onlyAdmin.js';
import { getPostulacionesTotales } from '../controllers/adminController.js';


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


export default adminRoutes;