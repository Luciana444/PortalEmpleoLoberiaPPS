import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { onlyAdmin } from '../middlewares/onlyAdmin.js';
import { getPostulacionesTotales } from '../controllers/adminController.js';


export const adminRoutes = express.Router();



adminRoutes.get('/postulaciones_totales',authMiddleware,onlyAdmin, getPostulacionesTotales);


export default adminRoutes;