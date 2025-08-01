// Middleware de autenticación JWT para proteger rutas privadas.
// Verifica que el token sea válido, no esté invalidado y agrega datos del usuario a la request.


import jwt from 'jsonwebtoken';
import sql from '../database/db.js'; // Conexión a la base de datos con postgres.js

/**
 * Middleware que verifica la validez del token JWT enviado en el header Authorization.
 * - Requiere que el token esté en formato "Bearer TOKEN".
 * - Verifica que el token no haya sido invalidado (por logout, por ejemplo).
 * - Si es válido, agrega el payload del token como `req.usuario` y continúa con `next()`.
 * - Si no, devuelve error 401 (no autorizado).
 */

export const authMiddleware = async(req, res, next)=>{
    const authHeader = req.headers.authorization;
    // Verifica que exista el header Authorization con formato correcto
    if(!authHeader|| !authHeader.startsWith('Bearer ')){
        return res.status(401).json({error:'Token no proporcionado'});
    }
     
    // Extrae el token (remueve el prefijo "Bearer ")
    const token = authHeader.split(' ')[1];

    try {

        // Verifica la firma del token usando la clave secreta definida en .env
        const payload = jwt.verify(token,process.env.JWT_SECRET);

        // Si todo está bien, adjunta los datos del usuario al objeto `req`
        req.usuario = payload;
        req.token = token;

         // Continúa con la siguiente función/middleware
        next();


    } catch (error) {
        return res.status(401).json({mensaje:'Token invalido o expirado'})
    }

}

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = {
        id_usuario: decoded.id,
        tipo_usuario: decoded.tipo_usuario
      };
    } catch (error) {
      console.warn('Token inválido o expirado');
      req.usuario = {}; 
    }
  } else {
    req.usuario = {}; 
  }

  next();
};

