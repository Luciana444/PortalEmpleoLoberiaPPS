
// Importamos la lógica de negocio desde el servicio correspondiente
import { cancelarPostulacionOferta, crearPostulacion, subirCvBD, verificarPostulacion } from "../services/ciudadanoService.js";
import  {generarPdfUsuario, obtenerPostulacionesService,buscarOfertasFiltradasService }  from "../services/ciudadanoService.js";
import fs from 'fs/promises';

//================================================================
// subir perfil
//================================================================
/**
 * Controlador para subir el archivo CV en formato PDF y guardarlo en el perfil del ciudadano.
 *
 * @async
 * @function subirCV
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} req.file - Archivo enviado en la petición (espera un PDF).
 * @param {Object} req.usuario - Usuario autenticado (del middleware auth).
 * @param {string} req.usuario.id - ID del ciudadano autenticado.
 * @param {Object} res - Objeto de respuesta HTTP.
 * 
 * @returns {JSON} Mensaje de éxito y URL donde se almacenó el CV o mensaje de error.
 * 
 * @throws {400} Si no se envía el archivo PDF.
 * @throws {500} Para errores internos al subir el archivo o guardar la URL.
 * 
 * @description
 * Verifica que se haya recibido un archivo PDF.  
 * Construye la URL donde se almacenó el archivo.  
 * Llama a la función `subirCvBD` para guardar la URL en la base de datos del usuario.  
 * Devuelve la URL y mensaje de éxito, o error en caso de falla.
 */


export const subirCV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Falta el archivo CV en formato PDF' });
    }
    const url_cv = `/uploads/cv/${req.file.filename}`;
    console.log(req.file.filename);
 // Guardamos la URL del CV en la base de datos del ciudadano
    await subirCvBD(req.usuario.id,url_cv);

    return res.status(200).json({
      mensaje: 'CV subido correctamente',
      url: url_cv
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al subir el CV' });
  }
};



//===========================================================
//actualizar perfil ciudadano
//===========================================================
/**
 * Actualiza el perfil completo del ciudadano, incluyendo datos personales,
 * capacitaciones y experiencias laborales.
 *
 * @async
 * @function actualizarPerfilCiudadano
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} req.usuario - Usuario autenticado.
 * @param {string} req.usuario.id - ID del ciudadano autenticado.
 * @param {Object} req.body - Datos enviados para actualizar el perfil.
 * @param {string} [req.body.nombre] - Nombre del ciudadano.
 * @param {string} [req.body.apellido] - Apellido del ciudadano.
 * @param {string} [req.body.fecha_nacimiento] - Fecha de nacimiento (formato ISO).
 * @param {string} [req.body.telefono] - Teléfono (solo números).
 * @param {string} [req.body.email] - Email válido.
 * @param {string} [req.body.dni] - DNI válido.
 * @param {string} [req.body.cuil] - CUIL válido (11 dígitos).
 * @param {string} [req.body.calle] - Calle.
 * @param {string} [req.body.numero] - Número.
 * @param {string} [req.body.piso] - Piso (opcional).
 * @param {string} [req.body.dpto] - Departamento (opcional).
 * @param {string} [req.body.localidad] - Localidad.
 * @param {string} [req.body.provincia] - Provincia.
 * @param {string} [req.body.pais] - País.
 * @param {string} [req.body.nivel_educativo] - Nivel educativo alcanzado.
 * @param {boolean} [req.body.esta_cursando_carrera] - Si está cursando carrera.
 * @param {string} [req.body.carrera_en_curso] - Nombre de la carrera en curso.
 * @param {string} [req.body.situacion_laboral] - Situación laboral actual.
 * @param {string} [req.body.tiene_emprendimiento] - Información sobre emprendimiento.
 * @param {string} [req.body.discapacidad] - Información sobre discapacidad.
 * @param {string} [req.body.nombre_capacitacion] - Nombre de una capacitación a agregar.
 * @param {string} [req.body.nombre_empresa] - Nombre de empresa para experiencia laboral.
 * @param {string} [req.body.desde] - Fecha inicio experiencia laboral.
 * @param {string} [req.body.hasta] - Fecha fin experiencia laboral (opcional).
 * @param {string} [req.body.comentario] - Comentario para experiencia laboral (opcional).
 * @param {Object} res - Objeto de respuesta HTTP.
 *
 * @returns {JSON} Mensaje de confirmación o error detallado.
 *
 * @throws {400} Si faltan datos o son inválidos.
 * @throws {401} Si el usuario no está autenticado.
 * @throws {500} Si ocurre un error interno del servidor.
 *
 * @description
 * Valida y filtra los campos válidos para actualizar el perfil personal del ciudadano.
 * Valida formatos específicos (email, fechas, teléfono, DNI, CUIL, booleanos).
 * Permite agregar capacitaciones y experiencias laborales mediante datos en el body.
 * Devuelve mensajes de error claros para cada caso.
 */



import { actualizarPerfil,agregarExperienciaLaboral,agregarCapacitacion } from '../services/ciudadanoService.js';

export const actualizarPerfilCiudadano = async (req, res) => {
  try {
    // Tomamos el ID del usuario autenticado, o desde el body si se permite
    const id_ciudadano = req.usuario?.id;

    if (!id_ciudadano) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    // Campos válidos que se permiten actualizar
    const camposValidos = [
      'nombre', 'apellido', 'fecha_nacimiento', 'telefono', 'email', 'dni', 'cuil',
      'calle', 'numero', 'piso', 'dpto', 'localidad', 'provincia', 'pais',
      'nivel_educativo', 'esta_cursando_carrera', 'carrera_en_curso', 'situacion_laboral',
      'tiene_emprendimiento', 'discapacidad'
    ];

    // Filtramos los campos que efectivamente se están enviando
    const actualizaciones = {};
    for (const campo of camposValidos) {
      if (campo in req.body) actualizaciones[campo] = req.body[campo];
    }

    // Si no hay campos para actualizar en perfiles_ciudadanos ni experiencia ni capacitacion, error
        if (
      Object.keys(actualizaciones).length === 0 &&
      !req.body.nombre_capacitacion &&
      !req.body.nombre_empresa && 
      !req.body.desde && 
      !req.body.hasta && 
      !req.body.comentario
    ) {
      return res.status(400).json({ error: 'No se enviaron datos para actualizar' });
    }

    // validaciones básicas por campo
    if ('fecha_nacimiento' in actualizaciones && isNaN(Date.parse(actualizaciones.fecha_nacimiento))) {
      return res.status(400).json({ error: 'Fecha de nacimiento inválida' });
    }
    if ('telefono' in actualizaciones && !/^\d{6,20}$/.test(actualizaciones.telefono)) {
      return res.status(400).json({ error: 'Teléfono inválido (solo números)' });
    }
    if ('dni' in actualizaciones && !/^\d{6,10}$/.test(actualizaciones.dni)) {
      return res.status(400).json({ error: 'DNI inválido' });
    }
    if ('cuil' in actualizaciones && !/^\d{11}$/.test(actualizaciones.cuil)) {
      return res.status(400).json({ error: 'CUIL inválido (11 dígitos)' });
    }
    if ('email' in actualizaciones && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(actualizaciones.email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }
    if ('esta_cursando_carrera' in actualizaciones && typeof actualizaciones.esta_cursando_carrera !== 'boolean') {
      return res.status(400).json({ error: 'El campo esta_cursando_carrera debe ser true o false' });
    }

    // Si hay campos válidos para actualizar, llamamos al service
    if (Object.keys(actualizaciones).length > 0) {
      await actualizarPerfil(id_ciudadano, actualizaciones);
    }

    // Capacitación: si viene nombre_capacitacion directamente en el body
    if (req.body.nombre_capacitacion) {
      const nombreCap = req.body.nombre_capacitacion;

      if (typeof nombreCap !== 'string' || nombreCap.trim() === '') {
        return res.status(400).json({ error: 'Nombre de capacitación inválido' });
      }

      await agregarCapacitacion(id_ciudadano, nombreCap.trim());
    }

    // Experiencia laboral: si vienen los campos sueltos en el body
    const { nombre_empresa, desde, hasta, comentario } = req.body;

    if (nombre_empresa || desde || hasta || comentario) {
      if (!nombre_empresa || typeof nombre_empresa !== 'string') {
        return res.status(400).json({ error: 'Nombre de empresa inválido' });
      }

      if (!desde || isNaN(Date.parse(desde))) {
        return res.status(400).json({ error: 'Fecha "desde" inválida' });
      }

      if (hasta && isNaN(Date.parse(hasta))) {
        return res.status(400).json({ error: 'Fecha "hasta" inválida' });
      }

      if (hasta && new Date(hasta) < new Date(desde)) {
        return res.status(400).json({ error: 'La fecha "hasta" no puede ser anterior a "desde"' });
      }

      await agregarExperienciaLaboral(id_ciudadano, { nombre_empresa, desde, hasta, comentario });
    }

    // Respuesta exitosa
    res.json({ message: 'Perfil actualizado correctamente' });

  } catch (error) {
    console.error('Error actualizando perfil:', error);
    res.status(500).json({ error: 'Error al actualizar el perfil' });
  }
};



//====================================================================
// generar pdf
//====================================================================

/**
 * Genera un PDF con la información del CV del usuario autenticado y lo envía en la respuesta.
 * 
 * @param {Request} req - Objeto de la solicitud HTTP, se espera que contenga `user.id` con el ID del usuario autenticado.
 * @param {Response} res - Objeto de la respuesta HTTP para enviar el PDF o un mensaje de error.
 * 
 * @returns {Response} - Envía un PDF o un JSON con el error correspondiente.
 */

export const generarPdf = async (req, res) => {
  try {
    const id = req.usuario.id;

    if (!id) {
      // Si no hay id en el usuario autenticado, se devuelve error 404
      return res.status(404).json({ error: 'Falta el id del usuario' });
    }

    // Llama a la función que genera el PDF y lo envía en la respuesta
      await generarPdfUsuario(id, res);
  } catch (error) {
     // En caso de error, responde con error 500
    return res.status(500).json({ error: 'Error al crear pdf' });
  }
};

//========================================================
// obtener perfil completo
//=======================================================
/**
 * Obtiene el perfil completo del ciudadano autenticado.
 *
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP de Express.
 * @param {Object} req.usuario - Usuario autenticado extraído del token JWT.
 * @param {Object} res - Objeto de respuesta HTTP de Express.
 * @returns {void} Retorna un objeto JSON con los datos del perfil si existe.
 *
 * @throws {401} Si el usuario no está autenticado.
 * @throws {404} Si no se encuentra el perfil del ciudadano.
 * @throws {500} Si ocurre un error inesperado en el servidor.
 */



//==========================================================
// obtener perfil completo
//==========================================================
/**
 * Obtiene el perfil completo del ciudadano autenticado, incluyendo datos personales,
 * capacitaciones y experiencias laborales.
 *
 * @async
 * @function obtenerPerfilCompleto
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} req.usuario - Usuario autenticado.
 * @param {string} req.usuario.id - ID del ciudadano autenticado.
 * @param {Object} res - Objeto de respuesta HTTP.
 *
 * @returns {JSON} Perfil completo del ciudadano o mensaje de error.
 *
 * @throws {401} Si el usuario no está autenticado.
 * @throws {404} Si no se encuentra el perfil del ciudadano.
 * @throws {500} Si ocurre un error interno del servidor.
 *
 * @description
 * Valida la autenticación del usuario y llama al servicio para obtener el perfil completo.
 * Devuelve el perfil o los errores correspondientes.
 */


import { getPerfilCompleto } from '../services/ciudadanoService.js';
import { getOfertaById } from "../services/empleadorService.js";
import { getPostulacionById } from "../repositories/empleadorRepository.js";
import { getPostulacionByOfertaAndUsuario } from "../repositories/ciudadanoRepository.js";

export const obtenerPerfilCompleto = async (req, res) => {
  try {
    const id_ciudadano = req.usuario?.id;

    if (!id_ciudadano) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    const perfil = await getPerfilCompleto(id_ciudadano);

    if (!perfil) {
      return res.status(404).json({ error: 'Perfil no encontrado' });
    }

    res.json(perfil);
  } catch (error) {
    console.error('Error al obtener perfil completo:', error);
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
};

//===============================================================

/**
 * Obtener todas las postulaciones realizadas por el ciudadano autenticado.
 *
 * Este controlador extrae el ID del ciudadano desde el token (req.usuario.id)
 * y consulta todas las postulaciones relacionadas. Devuelve un array con la
 * información relevante de cada postulación.
 *
 * @function
 * @name obtenerPostulaciones
 * @memberof controllers.ciudadano
 *
 * @param {Object} req - Objeto de solicitud (Express)
 * @param {Object} req.usuario - Usuario autenticado (inyectado por authMiddleware)
 * @param {string} req.usuario.id - ID del ciudadano autenticado
 * @param {Object} res - Objeto de respuesta HTTP
 *
 * @returns {JSON} Array de postulaciones con información básica
 *
 * @throws {500} Error interno del servidor
 */


export const obtenerPostulaciones = async (req, res) => {
  try {
    const idCiudadano = req.usuario.id;

    const postulaciones = await obtenerPostulacionesService(idCiudadano);

    res.status(200).json(postulaciones);
  } catch (error) {
    console.error('Error al obtener postulaciones del ciudadano:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

//================================================================

/**
 * Permite al ciudadano autenticado postularse a una oferta laboral activa.
 *
 * Verifica que la oferta exista y esté activa, que el ciudadano no se haya postulado antes,
 * y guarda la postulación junto con el mensaje y el CV (si se proporciona).
 * El CV se almacena y se guarda su ruta relativa en la base de datos.
 *
 * @function
 * @name postularseAOferta
 * @memberof controllers.ciudadano
 *
 * @param {Object} req - Objeto de solicitud (Express)
 * @param {Object} req.params - Parámetros de ruta
 * @param {string} req.params.id - ID de la oferta laboral
 * @param {Object} req.usuario - Usuario autenticado
 * @param {string} req.usuario.id - ID del ciudadano autenticado
 * @param {Object} req.file - Archivo CV subido (procesado por multer)
 * @param {Object} req.body - Cuerpo de la solicitud
 * @param {string} [req.body.mensaje] - Mensaje opcional del ciudadano
 * @param {Object} res - Objeto de respuesta HTTP
 *
 * @returns {JSON} Mensaje de éxito o error
 *
 * @throws {400} Si falta el ID de la oferta, si la oferta no está activa, o si ya está postulado
 * @throws {401} Si falta el ID del usuario
 * @throws {500} Si ocurre un error interno al registrar la postulación
 */

export const postularseAOferta = async(req,res)=>{

  try {
      const id_usuario = req.usuario.id;
      const id_oferta = req.params.id;

      if(!id_oferta){
        return res.status(400).json({error:'Falta el ID de la oferta'});
      }

      if(!id_usuario){
        return res.status(401).json({message:'Falta el ID del usuario'});
      }


      const oferta = await getOfertaById(id_oferta);
      
      if (!oferta || oferta.estado !== 'activa') {
          return res.status(400).json({ error: 'La oferta no existe o no está activa' });
      }
      
      const yaPostulado = await verificarPostulacion(id_oferta,id_usuario);

      if(yaPostulado){
        if(req.file?.path){
          await fs.unlink(req.file.path);
        }
        return res.status(400).json({message:'Ya esta postulado'})
      }

      const url_cv = req.file ? `/uploads/cv/${req.file.filename}` : null;

      const mensaje = req.body.mensaje;

      await crearPostulacion(id_oferta,id_usuario, mensaje, url_cv);
      
      return res.status(200).json({message:'Postulacion exitosa'})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error al registrar la postulación' });
  }
};

//======================================================

/**
 * Buscar ofertas laborales aplicando filtros opcionales enviados por el ciudadano.
 *
 * Este endpoint es accesible solo para ciudadanos autenticados.
 * Permite filtrar las ofertas laborales según modalidad, lugar de trabajo, puesto requerido o descripción.
 *
 * @function
 * @name buscarOfertasConFiltros
 * @memberof controllers.ciudadano
 *
 * @param {Object} req - Objeto de solicitud HTTP (Express)
 * @param {Object} req.query - Parámetros de consulta (query params)
 * @param {string} [req.query.modalidad] - Modalidad de trabajo (ej. "Tiempo completo", "Freelance", etc.)
 * @param {string} [req.query.lugar_trabajo] - Lugar de trabajo (ej. "Presencial", "Remoto", "Mixto")
 * @param {string} [req.query.descripcion] - Palabra clave en la descripción de la oferta
 * @param {string} [req.query.puesto_requerido] - Título o puesto buscado
 *
 * @param {Object} res - Objeto de respuesta HTTP (Express)
 * 
 * @returns {JSON} Retorna un array de ofertas laborales que coinciden con los filtros.
 *
 * @throws {500} Si ocurre un error interno en el servidor.
 */


export const buscarOfertasConFiltros = async (req, res) => {
  try {
    const { modalidad, lugar_trabajo, descripcion, puesto_requerido } = req.query;

    const filtros = {
      modalidad,
      lugarTrabajo: lugar_trabajo,
      descripcion,
      puestoRequerido: puesto_requerido
    };

    const resultados = await buscarOfertasFiltradasService(filtros);
    res.status(200).json(resultados);
  } catch (error) {
    console.error('Error al buscar ofertas con filtros:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


//===================================================
/**
 * Controlador para cancelar la postulación de un ciudadano autenticado a una oferta laboral.
 * Solo puede cancelar postulaciones activas a ofertas activas.
 * 
 * @async
 * @function cancelarPostulacion
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.params - Parámetros de la ruta.
 * @param {string} req.params.id - ID de la oferta a la cual se postuló.
 * @param {Object} req.usuario - Usuario autenticado (ciudadano).
 * @param {string} req.usuario.id - ID del ciudadano autenticado.
 * @param {Object} res - Objeto de respuesta de Express.
 * 
 * @returns {Promise<void>} Devuelve un mensaje confirmando la cancelación.
 * 
 * @throws {400} Si la oferta no existe o no está activa.
 * @throws {401} Si no se proporciona el ID de la oferta.
 * @throws {404} Si el ciudadano no está postulado a esa oferta.
 * @throws {500} Si ocurre un error al cancelar la postulación.
 * 
 * @example
 * // DELETE /ciudadano/ofertas/uuid-oferta/cancelar_postulacion
 * // Headers: Authorization: Bearer <token>
 * 
 * // Respuesta:
 * {
 *   "message": "Se cancelo la postulacion correctamente"
 * }
 */

export const cancelarPostulacion = async(req,res)=>{
try {
    const id_oferta = req.params.id;
    const id_usuario = req.usuario.id;

    if(!id_oferta){
      return res.status(401).json({message:'Falta el id de la oferta'});
    }

    const oferta = await getOfertaById(id_oferta);

    if (!oferta || oferta.estado !== 'activa') {
          return res.status(400).json({ error: 'La oferta no existe o no está activa' });
    }

    const postulacion = await getPostulacionByOfertaAndUsuario(id_oferta,id_usuario);

    if(!postulacion){
      return res.status(404).json({message:'Usted no esta postulado a esta oferta'});
    }

    await cancelarPostulacionOferta(postulacion.id);

    return res.status(200).json({message:'Se cancelo la postulacion correctamente'})

} catch (error) {
  console.log(error);
  res.status(500).json({message:'Error al cancelar la postulacion a la oferta'})
}
};