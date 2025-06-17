import express from 'express';
import {registrarEmpleador} from '../controllers/empleadorController.js';
export const empleadorRoutes = express.Router();
empleadorRoutes.post('/',registrarEmpleador);
