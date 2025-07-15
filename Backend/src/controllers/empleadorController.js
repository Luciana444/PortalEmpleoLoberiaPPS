import { getDatosEmpresa, updatePerfilEmpresa, obtenerOfertasPorEmpresa, obtenerOfertasActivas, crearOferta, eliminarOferta, getOfertaById, editarOferta } from "../services/empleadorService.js";
import { empresaValidation } from "../validations/empresaValidation.js";
import { crearOfertaSchema, editarOfertaSchema } from "../validations/ofertaValidation.js";

//=================================================================
// end point actializar perfil de la empresa
//==================================================================
/**
 * Actualiza los datos del perfil de una empresa autenticada.
 *
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} req.usuario - Usuario autenticado con su ID.
 * @param {Object} req.body - Datos a actualizar en el perfil de la empresa.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {void}
 *
 * @throws {400} Si falta el ID del usuario o si los datos no pasan la validación.
 * @throws {500} Si ocurre un error en la actualización.
 */


export const actualizarPerfilEmpresa = async(req,res)=>{
    try {
        const id_usuario = req.usuario.id;
        if (!id_usuario) {
          // Si no existe id en el usuario autenticado, error 400
          return res.status(400).json({ error: 'Falta el id de la empresa' });
        }
         // Validación de los datos recibidos en req.body según esquema empresaValidation
        const {error} = empresaValidation.validate(req.body, {abortEarly:false});

        if(error){
          // Si hay errores de validación, responder con detalles y status 400
            return res.status(400).json({
                errores:error.details.map(d=>d.message)
            })
        }

        // Actualiza perfil en la base de datos (función definida en el service)
        await updatePerfilEmpresa(id_usuario, req.body);

        // Respuesta exitosa
        res.status(200).json({ message: 'Perfil actualizado correctamente' });
      } catch (error) {
        // Loguea el error y responde con error 500
        console.error('Error actualizando perfil:', error);
        res.status(500).json({ error: 'Error al actualizar el perfil' });
      }

}

//=======================================================================

/**
 * Obtiene los datos del perfil de la empresa autenticada.
 *
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} req.usuario - Objeto que contiene el ID del usuario autenticado.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {void}
 *
 * @throws {404} Si no se encuentra el ID del usuario en el token.
 * @throws {500} Si ocurre un error al recuperar los datos desde la base de datos.
 */



export const obtenerDatosEmpresa = async (req,res)=>{
  try {
    const id_usuario = req.usuario.id;
    if(!id_usuario){
      return res.status(404).json({message: 'Falta el id del usuario'});
    }

    const datosEmpresa = await getDatosEmpresa(id_usuario);

    return res.status(200).json(datosEmpresa);

  } catch (error) {
    console.log(error);
    res.status(500).json({error:'Error al obtener los datos de la empresa'});
  }
}


export const obtenerOfertasEmpresa = async (req, res) => {
  try {
    const idEmpresa = req.usuario?.id;
    const estadoPublicacion = req.query.estado_publicacion; 

    if (!idEmpresa) {
      return res.status(401).json({ error: 'Empresa no autenticada' });
    }

    const valoresPermitidos = ['pendiente', 'aprobada', 'rechazada'];
    if (estadoPublicacion && !valoresPermitidos.includes(estadoPublicacion)) {
      return res.status(400).json({ error: 'Estado de publicación no válido' });
    }

    const ofertas = await obtenerOfertasPorEmpresa(idEmpresa, estadoPublicacion);
    res.json(ofertas);
  } catch (error) {
    console.error('Error al obtener ofertas:', error);
    res.status(500).json({ error: 'Error interno al obtener ofertas' });
  }
};



export const traerOfertasActivas = async (req, res) => {
  try {
    const ofertas = await obtenerOfertasActivas();
    res.json(ofertas);
  } catch (error) {
    console.error('Error al obtener ofertas activas:', error);
    res.status(500).json({ error: 'Error interno al obtener ofertas activas' });
  }
};


export const crearOfertaLaboral = async (req,res)=>{
  try {
    const id_empresa = req.usuario.id;
    if(!id_empresa){
      return res.status(404).json({message:'Falta el id de la empresa'})
    }

    const {error} = crearOfertaSchema.validate(req.body, {abortEarly:false});

    if(error){
      return res.status(400).json({
            errores:error.details.map(d=>d.message)
        })
    }



    await crearOferta(id_empresa, req.body);

    
    res.status(200).json({ message: 'Oferta creada correctamente' });

  } catch (error) {
    res.status(500).json({message:'Error al crear oferta'})
  }
};


export const eliminarOfertaEmpresa = async (req, res) => {
  const idOferta = req.params.id;
  const idEmpresa = req.usuario?.id;

  if (!idOferta || !idEmpresa) {
    return res.status(400).json({ error: 'Faltan datos necesarios' });
  }

  try {
    // Validar que la oferta exista y pertenezca a esta empresa
    const oferta = await getOfertaById(idOferta);

    if (!oferta) {
      return res.status(404).json({ error: 'Oferta no encontrada' });
    }

    if (oferta.id_empresa !== idEmpresa) {
      return res.status(403).json({ error: 'No tienes permiso para eliminar esta oferta' });
    }

    await eliminarOferta(idOferta);
    res.status(200).json({ message: 'Oferta eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar oferta:', error);
    res.status(500).json({ error: 'Error al eliminar la oferta' });
  }
};


export const editarOfertaLaboral = async(req,res)=>{
  try {
    const id_oferta = req.params.id;
    const id_empresa = req.usuario.id;

    if(!id_oferta || !id_empresa){
      return res.status(400).json({message:'Falta el id de la oferta o de la empresa'});
    }

    const {error} = editarOfertaSchema.validate(req.body, {abortEarly:false});

    if(error){
        return res.status(400).json({
              errores:error.details.map(d=>d.message)
        })
    }

    const oferta = await getOfertaById(id_oferta);
    const empresa = await getDatosEmpresa(id_empresa);

    if(!empresa){
      return res.status(404).json({message:'La empresa no existe'});
    }

    if(!oferta){
      return res.status(404).json({message:'La oferta no existe'});
    }

    if(oferta.id_empresa !== id_empresa){
      return res.status(500).json({message:'Esta oferta no pertenece a su empresa'});
    }

    if(oferta.estado !== 'activa'){
      return res.status(500).json({message:"Error, solo se pueden editar ofertas activas"});
    }

    if (oferta.fecha_cierre && new Date(oferta.fecha_cierre) < new Date()) {
      return res.status(500).json({message:'Error, solo se pueden editar ofertas que no esten vencidas'});
    }

    await editarOferta(req.body,id_oferta,id_empresa);

    res.status(200).json({message:'Oferta editada correctamente'});

  } catch (error) {
    console.log(error);
    res.status(500).json({message:'Error al editar la oferta laboral'});
  }
};


