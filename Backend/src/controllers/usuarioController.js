// Controlador para operaciones relacionadas con usuarios.
// Este archivo define la lógica de los endpoints definidos en usuarioRoutes.js.

import { findAllPersonas, getUserById} from "../services/usuarioService.js"; // Servicio que consulta todos los usuarios

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

export const getUsuarioById = async(id)=>{
  try {
    const usuario = await getUserById(id);
    return usuario;
  } catch (error) {
      console.log(error);
  }
}




import { guardarFotoPerfil } from '../services/usuarioService.js';
import fs from 'fs/promises';

export const subirFotoPerfil = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se recibió archivo' });
    }

    const userId = req.usuario?.id;
    const tipoUsuario = req.usuario?.tipo_usuario;

    if (!userId || !tipoUsuario) {
      await fs.unlink(req.file.path);
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    const urlFoto = await guardarFotoPerfil(userId, req.file, tipoUsuario);

    res.json({
      message: 'Foto de perfil subida exitosamente',
      url: urlFoto
    });

  } catch (error) {
    console.error('Error subirFotoPerfil:', error);

    if (req.file?.path) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error eliminando archivo tras fallo:', unlinkError);
      }
    }

    res.status(500).json({ error: 'Error al subir la foto de perfil' });
  }
};

