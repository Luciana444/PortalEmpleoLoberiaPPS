import { insertarUrlCv } from "../repositories/ciudadanoRepository.js";


export const subirCvBD = async(id_usuario,url_cv)=>{
    return await insertarUrlCv(id_usuario, url_cv);
}


import { updatePerfilCiudadano } from '../repositories/ciudadanoRepository.js';

export const actualizarPerfil = async (userId, datos) => {
  try {
    await updatePerfilCiudadano(userId, datos);
  } catch (error) {
    throw error;
  }
};