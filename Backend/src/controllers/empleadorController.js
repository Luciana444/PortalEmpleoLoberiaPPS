import { getDatosEmpresa, updatePerfilEmpresa, obtenerOfertasPorEmpresa, obtenerOfertasActivas, crearOferta, eliminarOferta, getOfertaById, editarOferta,obtenerYMarcarNotificaciones } from "../services/empleadorService.js";
import { empresaValidation } from "../validations/empresaValidation.js";
import { crearOfertaSchema, editarOfertaSchema } from "../validations/ofertaValidation.js";

//=================================================================
// end point actualizar perfil de la empresa
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
//==================================================================
//Obtener ofertas

/**
 * @swagger
 * components:
 *   schemas:
 *     OfertaLaboral:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         puesto_requerido:
 *           type: string
 *         descripcion:
 *           type: string
 *         nivel_educativo_requerido:
 *           type: string
 *         experiencia_requerida:
 *           type: string
 *         otros_requisitos:
 *           type: string
 *         estado_publicacion:
 *           type: string
 *           enum: [pendiente, aprobada, rechazada]
 *         fecha_publicacion:
 *           type: string
 *           format: date
 *         id_empresa:
 *           type: string
 *           format: uuid
 */


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

//====================================================
// crear oferta laboral
/**
 * @swagger
 * components:
 *   schemas:
 *     NuevaOfertaLaboral:
 *       type: object
 *       required:
 *         - puesto_requerido
 *         - descripcion
 *         - nivel_educativo_requerido
 *         - lugar_trabajo
 *         - modalidad
 *       properties:
 *         puesto_requerido:
 *           type: string
 *         descripcion:
 *           type: string
 *         nivel_educativo_requerido:
 *           type: string
 *         experiencia_requerida:
 *           type: string
 *           nullable: true
 *         otros_requisitos:
 *           type: string
 *           nullable: true
 *         lugar_trabajo:
 *           type: string
 *           enum: [Presencial, Remoto, Mixto]
 *         modalidad:
 *           type: string
 *           enum: [Tiempo completo, Medio tiempo, Contrato a plazo fijo, Pasantía, Freelance]
 *         tipo_contrato:
 *           type: string
 *           nullable: true
 *         fecha_cierre:
 *           type: string
 *           format: date
 *           nullable: true
 *         localidad_del_puesto:
 *           type: string
 *           minLength: 1
 *           maxLength: 100
 *           nullable: true
 *       example:
 *         puesto_requerido: Desarrollador Frontend
 *         descripcion: Se necesita desarrollador con experiencia en React y diseño UI/UX.
 *         nivel_educativo_requerido: Universitario
 *         experiencia_requerida: 2 años
 *         otros_requisitos: Inglés técnico
 *         lugar_trabajo: Remoto
 *         modalidad: Tiempo completo
 *         tipo_contrato: Relación de dependencia
 *         fecha_cierre: 2025-08-01
 *         localidad_del_puesto: Mar del Plata
 */


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


//==================================================
// Eliminar oferta

/**
 * Elimina una oferta laboral perteneciente a la empresa autenticada
 * 
 * @route DELETE /empleador/eliminar/oferta/:id
 * @access Private (solo empresas)
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {200} Oferta eliminada correctamente
 * @returns {400} Faltan datos necesarios
 * @returns {403} No tiene permiso para eliminar esta oferta
 * @returns {404} Oferta no encontrada
 * @returns {500} Error interno del servidor
 */


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

//===============================================
//editar oferta
/**
 * @swagger
 * components:
 *   schemas:
 *     EditarOfertaLaboral:
 *       type: object
 *       properties:
 *         puesto_requerido:
 *           type: string
 *         descripcion:
 *           type: string
 *         nivel_educativo_requerido:
 *           type: string
 *         experiencia_requerida:
 *           type: string
 *         otros_requisitos:
 *           type: string
 *       example:
 *         puesto_requerido: Desarrollador Backend
 *         descripcion: Experiencia en Node.js y PostgreSQL
 *         nivel_educativo_requerido: Universitario
 *         experiencia_requerida: 3 años
 *         otros_requisitos: Inglés intermedio
 */


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

//======================================

/**
 * Controlador para obtener las notificaciones de la empresa autenticada.
 * Marca las notificaciones como leídas al momento de obtenerlas.
 *
 * @async
 * @function
 * @param {import('express').Request} req - Objeto de solicitud HTTP de Express.
 * @param {import('express').Response} res - Objeto de respuesta HTTP de Express.
 * @returns {Promise<void>} - Devuelve una respuesta JSON con la lista de notificaciones o un error.
 *
 * @throws {401} Si no se encuentra el ID de la empresa autenticada.
 * @throws {500} Si ocurre un error interno al obtener las notificaciones.
 *
 * @example
 * // Respuesta exitosa (200)
 * {
 *   "cantidad": 2,
 *   "notificaciones": [
 *     {
 *       "id": "d93a6e72-5a1f-4b88-8ea4-3e3d37f9db63",
 *       "mensaje": "Nueva postulación recibida",
 *       "leida": false,
 *       "fecha": "2025-07-16T18:30:00.000Z"
 *     }
 *   ]
 * }
 */

export const obtenerNotificaciones = async (req, res) => {
  try {
    const idEmpresa = req.usuario?.id;

    if (!idEmpresa) {
      return res.status(401).json({ error: 'Empresa no autenticada' });
    }

    const notificaciones = await obtenerYMarcarNotificaciones(idEmpresa);

    res.status(200).json({
      cantidad: notificaciones.length,
      notificaciones
    });
  } catch (error) {
    console.error('Error al obtener notificaciones:', error);
    res.status(500).json({ error: 'Error interno al obtener notificaciones' });
  }
};
