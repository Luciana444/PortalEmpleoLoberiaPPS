// Controlador para operaciones relacionadas con usuarios.
// Este archivo define la lógica de los endpoints definidos en usuarioRoutes.js.

import { getDatosEmpresa, getOfertaById } from "../services/empleadorService.js";
import { findAllPersonas, getUserById} from "../services/usuarioService.js"; // Servicio que consulta todos los usuarios

//=================================================0
// get usuario
//===========================
/**
 * Obtiene la lista completa de usuarios registrados en el sistema.
 *
 * @async
 * @function getAllUsuarios
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 *
 * @returns {JSON[]} Arreglo con los datos de todos los usuarios.
 *
 * @throws {500} En caso de error interno del servidor (se registra en consola).
 *
 * @description
 * Llama al servicio que obtiene todos los usuarios y devuelve la lista con status 200.
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

//=====================================================
// Get usuario por id
//=====================================================
/**
 * Obtiene un usuario por su ID desde la base de datos.
 *
 * @async
 * @function getUsuarioById
 * @param {string} id - ID del usuario a buscar.
 * @returns {Object|undefined} Objeto con los datos del usuario si se encuentra, o undefined si ocurre un error.
 *
 * @throws {Error} Si ocurre un error durante la consulta, se registra en consola.
 */

export const getUsuarioById = async(id)=>{
  try {
    const usuario = await getUserById(id);
    return usuario;
  } catch (error) {
      console.log(error);
  }
}


//==================================================
//end point para subir una foto al perfil de usuario, ya sea ciudadano o empresa
//=============================================
/**
 * Sube y guarda la foto de perfil del usuario autenticado.
 * 
 * - Verifica que se haya enviado un archivo.
 * - Extrae el ID y tipo de usuario desde el token.
 * - Guarda la foto en el servidor y actualiza la URL en la base de datos.
 * - Si ocurre un error, elimina el archivo temporalmente cargado.
 * 
 * @async
 * @function subirFotoPerfil
 * @param {Object} req - Objeto de solicitud (request) de Express.
 * @param {Object} req.file - Archivo de imagen recibido desde el formulario (campo 'foto').
 * @param {Object} req.usuario - Información del usuario autenticado (incluye `id` y `tipo_usuario`).
 * @param {Object} res - Objeto de respuesta (response) de Express.
 * 
 * @returns {Object} JSON con mensaje y URL si se sube correctamente, o error en caso de fallo.
 */




// Importa la función que guarda la foto en la base de datos y devuelve la URL
import { guardarFotoPerfil } from '../services/usuarioService.js';
import fs from 'fs/promises';

// Controlador para manejar la subida de una foto de perfil
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

export const obtenerDetallesOferta = async(req,res)=>{
  try {
    const id_oferta = req.params.id;

    if(!id_oferta){
        return res.status(400).json({message:'Falta el id de la oferta o de la empresa'});
    }


    const oferta = await getOfertaById(id_oferta);
    const empresa = await getDatosEmpresa(oferta.id_empresa);

    

    if(!oferta){
        return res.status(404).json({message:'La oferta no existe'});
    }

    
    if(!empresa){
      return res.status(404).json({message:'La empresa no existe'});
    }


    const resultado = [];

    resultado.push(oferta);
    resultado.push(empresa);

    return res.status(200).json(resultado);

  } catch (error) {
    console.log(error);
    res.status(500).json({message:'Error al obtener detalles de la oferta'});
  }

};