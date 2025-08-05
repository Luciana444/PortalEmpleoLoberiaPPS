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
adminRoutes.get('/ofertas/laborales',authMiddleware,onlyAdmin,getOfertasLaborales);
adminRoutes.get('/ofertas_totales',authMiddleware,onlyAdmin,getOfertasTotales);
adminRoutes.get('/usuarios/resumen', authMiddleware, onlyAdmin, getResumenUsuarios);
adminRoutes.get('/ver/visitas',authMiddleware,onlyAdmin,getReporteVisitas);
adminRoutes.get('/generar_reporte',authMiddleware,onlyAdmin,generarReporteMetricas);
adminRoutes.get('/ciudadanos',authMiddleware,onlyAdmin,getListaCiudadanos);
adminRoutes.get('/empresas',authMiddleware,onlyAdmin,getListaEmpresas);
adminRoutes.put('/ofertas/:id/autorizar',authMiddleware,onlyAdmin,autorizarOferta);
adminRoutes.put('/empresas/:id/autorizar',authMiddleware,onlyAdmin,autorizarEmpresa);
export default adminRoutes;