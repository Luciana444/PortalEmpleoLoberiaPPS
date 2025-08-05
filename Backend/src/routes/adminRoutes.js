import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { onlyAdmin } from '../middlewares/onlyAdmin.js';
import { getPostulacionesTotales,getOfertasLaborales, getOfertasTotales,getResumenUsuarios,getReporteVisitas, generarReporteMetricas, getListaCiudadanos, autorizarOferta, getListaEmpresas, autorizarEmpresa } from '../controllers/adminController.js';


export const adminRoutes = express.Router();


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