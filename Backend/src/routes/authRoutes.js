
// Define las rutas HTTP relacionadas con la autenticación y gestión de sesiones de usuarios.
// Incluye registro, login, recuperación de contraseña y cierre de sesión.

import express from 'express';
import { iniciarSesion } from '../controllers/authController.js';
import{registrarse} from '../controllers/authController.js';
import{enviarTokenRecuperacion,resetearContrasena} from '../controllers/authController.js';

//Inicializa el router específico para autenticación
export const authRoutes = express.Router();


//===============================================================
//endpoint para registrar un usuario    
//==============================================================

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - contrasena
 *               - tipo_usuario
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre completo del usuario
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico único del usuario
 *               contrasena:
 *                 type: string
 *                 description: Contraseña del usuario
 *               tipo_usuario:
 *                 type: string
 *                 enum:
 *                   - ciudadano
 *                   - empresa
 *                 description: Rol del usuario
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Datos inválidos o usuario ya existe
 */

authRoutes.post('/register', registrarse)


//=========================================================
//endpoint para recuperar la contraseña
//=========================================================

/**
 * @swagger
 * /auth/recover/password:
 *   post:
 *     summary: Enviar token para recuperación de contraseña
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del usuario para enviar el token
 *     responses:
 *       200:
 *         description: Token de recuperación enviado correctamente
 *       404:
 *         description: Email no encontrado
 */

authRoutes.post('/recover/password', enviarTokenRecuperacion);

//===============================================================
// end point para resetear la contraseña
//==============================================================
/**
 * @swagger
 * /auth/reset/password:
 *   post:
 *     summary: Restablecer la contraseña usando token de recuperación
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - nuevaContrasena
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token de recuperación enviado al email del usuario
 *               nuevaContrasena:
 *                 type: string
 *                 description: Nueva contraseña que se desea establecer
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *       400:
 *         description: Token inválido, expirado o datos faltantes
 */


authRoutes.post('/reset/password', resetearContrasena);


//===============================================================
//endpoint para iniciar sesion de usuario
//===============================================================
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - contrasena
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del usuario
 *               contrasena:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, devuelve token de autenticación
 *       401:
 *         description: Credenciales inválidas
 */

authRoutes.post('/login',iniciarSesion);


export default authRoutes;
