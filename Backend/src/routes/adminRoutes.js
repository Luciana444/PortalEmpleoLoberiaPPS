import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { onlyAdmin } from '../middlewares/onlyAdmin.js';
import { getPostulacionesTotales,getOfertasLaborales, getOfertasTotales,getResumenUsuarios,getReporteVisitas } from '../controllers/adminController.js';


export const adminRoutes = express.Router();


adminRoutes.get('/postulaciones_totales',authMiddleware,onlyAdmin, getPostulacionesTotales);
adminRoutes.get('/ofertas/laborales',authMiddleware,onlyAdmin,getOfertasLaborales);
adminRoutes.get('/ofertas_totales',authMiddleware,onlyAdmin,getOfertasTotales);
adminRoutes.get('/usuarios/resumen', authMiddleware, onlyAdmin, getResumenUsuarios);
adminRoutes.get('/ver/visitas',authMiddleware,onlyAdmin,getReporteVisitas);

export default adminRoutes;