
import { getDatosEmpresaById, updatePerfilEmpresaById, getOfertasByEmpresaId,getOfertasActivas, crearOfertaNueva, deleteOfertaById, buscarOfertaPorId, editarOfertaExistente,obtenerPostulacionesPendientes, marcarPostulacionesComoLeidas, getPostulacionesPorOferta, getPostulacionById,  buscarNotificacionOfertaRepository, borrarNotificacionOfertaRepository } from "../repositories/empleadorRepository.js";
import { getPerfilCompleto } from "./ciudadanoService.js";


//============================================================================
/**
 * Actualiza los campos válidos del perfil de una empresa en la base de datos.
 *
 * @function
 * @async
 * @param {string} id_usuario - ID del usuario autenticado asociado a la empresa.
 * @param {Object} datosActualizados - Objeto con los campos y valores a actualizar.
 * @returns {Promise<void>}
 *
 * @throws {Error} Si no se envían campos válidos o si falta el ID del usuario.
 */


export const updatePerfilEmpresa = async (id_usuario,datosActualizados)=>{
    try {
        await updatePerfilEmpresaById(id_usuario,datosActualizados);
    } catch (error) {
        console.log(error);
    }
}

//==============================================================================

/**
 * Recupera los datos de perfil de una empresa a partir del ID de usuario autenticado.
 *
 * @function
 * @async
 * @param {string} id_usuario - ID del usuario autenticado (UUID).
 * @returns {Promise<Object>} Objeto con los datos de la empresa.
 *
 * @throws {Error} Si ocurre un error durante la consulta.
 */


export const getDatosEmpresa = async(id_usuario)=>{
    try {
        const datos = await getDatosEmpresaById(id_usuario);
        return datos;
    } catch (error) {
        console.log(error);
    }
}

//=======================================================================



export const obtenerOfertasPorEmpresa = async (idEmpresa, estadoPublicacion) => {
  return await getOfertasByEmpresaId(idEmpresa, estadoPublicacion);
};


export const obtenerOfertasActivas = async () => {
  return await getOfertasActivas();
};


export const crearOferta = async(id_empresa,datosOferta)=>{
    try {
        await crearOfertaNueva(id_empresa,datosOferta);
    } catch (error) {
        console.log(error);
    }
};

export const eliminarOferta = async (idOferta) => {
  return await deleteOfertaById(idOferta);
};

export const getOfertaById = async (idOferta) => {
  return await buscarOfertaPorId(idOferta);
};

export const editarOferta = async(datosActualizados,id_oferta,id_empresa)=>{
    return await editarOfertaExistente(datosActualizados,id_oferta,id_empresa);
}

export const obtenerYMarcarNotificaciones = async (idEmpresa) => {
  const notificaciones = await obtenerPostulacionesPendientes(idEmpresa);
  const ids = notificaciones.map(n => n.id);

  if (ids.length > 0) {
    await marcarPostulacionesComoLeidas(ids);
  }

  return notificaciones;
};


export const obtenerPostulacionesPorOfertaId = async(id_oferta)=>{
  try {
      const postulaciones = await getPostulacionesPorOferta(id_oferta);
      return postulaciones;
  } catch (error) {
      console.log(error);
  }
}

export const obtenerPostulacionPorId = async(id_postulacion)=>{

  try {
      const postulacion = await getPostulacionById(id_postulacion);
      return postulacion[0];
  } catch (error) {
    console.log(error);
  }
};

export const obtenerPerfilPostulante = async(id_ciudadano)=>{
  try {
      const perfil_usuario = await getPerfilCompleto(id_ciudadano);
      return perfil_usuario;
  } catch (error) {
    console.log(error);
  }
};

export const obtenerYBorrarNotificacionEmpresa = async (idEmpresa) => {
  const notificacion = await buscarNotificacionOfertaRepository(idEmpresa);

  if (!notificacion) return null;

  await borrarNotificacionOfertaRepository(notificacion.id);

  return notificacion.notificacion; 
};

