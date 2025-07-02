import sql from '../database/db.js';

export const insertarUrlCv = async (id_usuario, url_cv) => {
  const resultado = await sql`
    INSERT INTO postulaciones (id_usuario, id_oferta, fecha_postulacion, mensaje, cv_url, estado) VALUES 
    (${id_usuario}, '11ab02c3-58f1-4040-a779-e68a4cb2456f', 'NOW()', 
    'Ejemplo para subir cv a una postulacion', ${url_cv}, 'pendiente')
    RETURNING *;
  `;
  return resultado[0];
};


export const updatePerfilCiudadano = async (userId, datos) => {
  const campos = [];
  const valores = [];

  const camposValidos = [
    'nombre', 'apellido', 'fecha_nacimiento', 'telefono', 'email', 'dni', 'cuil',
    'calle', 'numero', 'piso', 'dpto', 'localidad', 'provincia', 'pais',
    'nivel_educativo', 'esta_cursando_carrera', 'carrera_en_curso', 'situacion_laboral',
    'tiene_emprendimiento', 'discapacidad', 'cv_url'
  ];

  for (const [clave, valor] of Object.entries(datos)) {
    if (camposValidos.includes(clave)) {
      campos.push(`${clave} = $${campos.length + 1}`);
      valores.push(valor);
    }
  }

  if (campos.length === 0) return;

  const query = `
    UPDATE perfiles_ciudadanos
    SET ${campos.join(', ')}
    WHERE id_ciudadano = $${valores.length + 1}
  `;

  valores.push(userId);

  const result = await sql.unsafe(query, valores);

  if (result.rowCount === 0) {
    throw new Error('No se encontró perfil para actualizar');
  }
};