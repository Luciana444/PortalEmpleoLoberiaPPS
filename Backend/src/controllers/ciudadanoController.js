
// Importamos la lógica de negocio desde el servicio correspondiente
import { subirCvBD } from "../services/ciudadanoService.js";
import  {generarPdfUsuario}  from "../services/ciudadanoService.js";

//================================================================
// subir perfil
//================================================================

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

import { getPerfilCompleto } from '../services/ciudadanoService.js';

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