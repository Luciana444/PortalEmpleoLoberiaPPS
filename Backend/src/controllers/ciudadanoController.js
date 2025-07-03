import { subirCvBD } from "../services/ciudadanoService.js";


export const subirCV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Falta el archivo CV en formato PDF' });
    }
    const url_cv = `/uploads/cv/${req.file.filename}`;
    console.log(req.file.filename);

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


import { actualizarPerfil } from '../services/ciudadanoService.js';

export const actualizarPerfilCiudadano = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    if (!userId) {
      return res.status(400).json({ error: 'Falta el ID del ciudadano' });
    }

    const camposValidos = [
      'nombre', 'apellido', 'fecha_nacimiento', 'telefono', 'email', 'dni', 'cuil',
      'calle', 'numero', 'piso', 'dpto', 'localidad', 'provincia', 'pais',
      'nivel_educativo', 'esta_cursando_carrera', 'carrera_en_curso', 'situacion_laboral',
      'tiene_emprendimiento', 'discapacidad'
    ];

    const actualizaciones = {};
    for (const campo of camposValidos) {
      if (campo in req.body) actualizaciones[campo] = req.body[campo];
    }

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

    await actualizarPerfil(userId, actualizaciones);

    res.json({ message: 'Perfil actualizado correctamente' });
  } catch (error) {
    console.error('Error actualizando perfil:', error);
    res.status(500).json({ error: 'Error al actualizar el perfil' });
  }
};