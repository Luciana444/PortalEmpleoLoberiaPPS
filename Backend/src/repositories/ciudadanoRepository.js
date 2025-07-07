import sql from '../database/db.js';

export const insertarUrlCv = async (id_usuario, url_cv) => {
  const resultado = await sql`
    UPDATE perfiles_ciudadanos SET cv_url = ${url_cv}
    WHERE id_ciudadano= ${id_usuario}
  `;
  return resultado[0];
};


export const updatePerfilCiudadano = async (userId, datos) => {
  const camposValidos = [
    'nombre', 'apellido', 'fecha_nacimiento', 'telefono', 'email', 'dni', 'cuil',
    'calle', 'numero', 'piso', 'dpto', 'localidad', 'provincia', 'pais',
    'nivel_educativo', 'esta_cursando_carrera', 'carrera_en_curso', 'situacion_laboral',
    'tiene_emprendimiento', 'discapacidad'
  ];

  const campos = [];
  const valores = [];

  for (const [clave, valor] of Object.entries(datos)) {
    if (camposValidos.includes(clave)) {
      campos.push(`${clave} = $${campos.length + 1}`);
      valores.push(valor);
    }
  }

  if (campos.length === 0) {
    throw new Error('No hay campos válidos para actualizar');
  }

  valores.push(userId);
  const indexId = valores.length;

  const query = `
    UPDATE perfiles_ciudadanos
    SET ${campos.join(', ')}
    WHERE id_ciudadano = $${indexId}
  `;

  const result = await sql.unsafe(query, valores); 

  if (result.count === 0 || result.rowCount === 0) {
    throw new Error('No se encontró perfil para actualizar');
  }
};

export const insertExperienciaLaboral = async (userId, experiencia) => {
  const { nombre_empresa, desde, hasta = null, comentario = null } = experiencia;

  await sql`
    INSERT INTO experiencias_laborales_ciudadanos
      (id_ciudadano, nombre_empresa, desde, hasta, comentario)
    VALUES
      (${userId}, ${nombre_empresa}, ${desde}, ${hasta}, ${comentario})
  `;
};

export const insertCapacitacion = async (userId, nombreCapacitacion) => {
  await sql`
    INSERT INTO capacitaciones_ciudadanos
      (id_ciudadano, nombre_capacitacion)
    VALUES
      (${userId}, ${nombreCapacitacion})
  `;
};

export const fetchPerfilCiudadano = async (userId) => {
  const result = await sql`SELECT * FROM perfiles_ciudadanos WHERE id_ciudadano = ${userId}`;
  return result[0];
};

export const fetchCapacitaciones = async (userId) => {
  return await sql`SELECT * FROM capacitaciones_ciudadanos WHERE id_ciudadano = ${userId}`;
};

export const fetchExperiencias = async (userId) => {
  return await sql`SELECT * FROM experiencias_laborales_ciudadanos WHERE id_ciudadano = ${userId}`;
};