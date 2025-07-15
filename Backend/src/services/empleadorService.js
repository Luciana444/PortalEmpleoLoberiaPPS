
import { getDatosEmpresaById, updatePerfilEmpresaById, getOfertasByEmpresaId,getOfertasActivas, crearOfertaNueva, deleteOfertaById, buscarOfertaPorId, editarOfertaExistente } from "../repositories/empleadorRepository.js";


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

