
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


import { actualizarPerfil } from '../services/ciudadanoService.js';

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
// validaciones basicas por campo
    if (Object.keys(actualizaciones).length === 0) {
      return res.status(400).json({ error: 'No se enviaron campos para actualizar' });
    }

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

    await actualizarPerfil(id_ciudadano, actualizaciones);

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
    const id = req.user?.id;

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