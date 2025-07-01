// Controlador para operaciones relacionadas con usuarios.
// Este archivo define la lógica de los endpoints definidos en usuarioRoutes.js.

import { findAllPersonas} from "../services/usuarioService.js"; // Servicio que consulta todos los usuarios

/**
 * Controlador que maneja la petición GET /usuario
 * Llama al servicio que recupera todos los usuarios desde la base de datos
 * y devuelve un array en formato JSON como respuesta.
 */

export const getAllUsuarios = async (req, res) => {
    try {
        // Solicita al servicio la lista completa de usuarios
        const personas = await findAllPersonas();

         // Devuelve la lista con código HTTP 200 (OK)
        return res.status(200).json(personas);
    } catch (error) {
         // En caso de error, lo registra en la consola
        
        console.error(error);
    }
}

import { guardarFotoPerfil } from '../services/usuarioService.js';

export const subirFotoPerfil = async (req, res) => {
  try {
    // Verificamos que haya archivo
    if (!req.file) {
      return res.status(400).json({ error: 'No se recibió archivo' });
    }

    // Obtenemos el userId
    const userId = req.user?.id || req.body.userId;


    if (!userId) {
      return res.status(400).json({ error: 'Usuario no identificado' });
    }

    // Llamamos al service para subir y guardar URL
    const urlFoto = await guardarFotoPerfil(userId, req.file);

    // Respondemos con la URL
    res.json({ message: 'Foto de perfil subida exitosamente', url: urlFoto });
  } catch (error) {
    console.error('Error subirFotoPerfil:', error);
    res.status(500).json({ error: 'Error al subir la foto de perfil' });
  }
};
