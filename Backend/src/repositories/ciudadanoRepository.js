import sql from '../database/db.js';


export const insertarUrlCv = async (id_usuario, url_cv) => {
  const resultado = await sql`
    UPDATE perfiles_ciudadanos SET cv_url = ${url_cv}
    WHERE id_ciudadano= ${id_usuario}
  `;
  return resultado[0];
};



export const getExperienciaByCiudadanoId = async(id_usuario)=>{
  const resultado = await sql`SELECT * FROM experiencias_laborales_ciudadanos WHERE id_ciudadano = ${id_usuario}`;
  return resultado;
};


export const getCapacitacionesByCiudadanoId = async(id_usuario)=>{
  const resultado = await sql`SELECT * FROM capacitaciones_ciudadanos WHERE id_ciudadano=${id_usuario}`;
  return resultado;
};



export const getCapacitacionById = async(id_capacitacion,id_usuario)=>{
  const resultado = await sql`SELECT * FROM capacitaciones_ciudadanos WHERE id=${id_capacitacion} AND id_ciudadano=${id_usuario}`;
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


export const obtenerPostulacionesRepository = async (idCiudadano) => {
  return await sql`
    SELECT 
      p.id AS id_postulacion,
      p.fecha_postulacion,
      p.estado,
      p.leido_por_empresa,
      p.mensaje,
      p.cv_url,
      o.id AS id_oferta,
      o.puesto_requerido,
      o.descripcion,
      o.lugar_trabajo,
      o.modalidad,
      o.tipo_contrato,
      o.fecha_publicacion,
      o.localidad_del_puesto,
      e.nombre_empresa
    FROM postulaciones p
    JOIN ofertas_laborales o ON p.id_oferta = o.id
    JOIN empresas e ON o.id_empresa = e.id_usuario
    WHERE p.id_ciudadano = ${idCiudadano}
    ORDER BY p.fecha_postulacion DESC
  `;
};



export const verificarUsuarioPostulado = async(id_oferta,id_usuario)=>{
  const resultado = await sql`SELECT 1 FROM postulaciones WHERE id_oferta = ${id_oferta} AND id_ciudadano =${id_usuario}`;
  return resultado.length > 0;
};




export const crearPostulacionRepository = async(id_oferta,id_usuario,mensaje,url_cv)=>{
  await sql`
    INSERT INTO postulaciones(id_oferta,fecha_postulacion, id_ciudadano,mensaje,estado,cv_url)
    VALUES (${id_oferta},NOW(),${id_usuario},${mensaje},${'pendiente'}, ${url_cv});
  `;

};



export const buscarOfertasFiltradas = async ({ modalidad, lugarTrabajo, descripcion, puestoRequerido }) => {
  let query = `
  SELECT 
    o.id,
    o.id_empresa,
    e.nombre_empresa,
    e.localidad,
    e.logo,
    o.puesto_requerido,
    o.descripcion,
    o.nivel_educativo_requerido,
    o.experiencia_requerida,
    o.otros_requisitos,
    o.lugar_trabajo,
    o.modalidad,
    o.tipo_contrato,
    o.fecha_publicacion,
    o.fecha_cierre,
    o.estado,
    o.estado_publicacion,
    o.fecha_aprobacion,
    o.localidad_del_puesto
  FROM ofertas_laborales o
  JOIN empresas e ON e.id_usuario = o.id_empresa
  WHERE o.estado_publicacion = 'aprobada'`;
  const valores = [];

  if (modalidad) {
    valores.push(modalidad);
    query += ` AND o.modalidad = $${valores.length}`;
  }

  if (lugarTrabajo) {
    valores.push(lugarTrabajo);
    query += ` AND o.lugar_trabajo = $${valores.length}`;
  }

  if (descripcion) {
    valores.push(`%${descripcion.trim()}%`);
    query += ` AND o.descripcion ILIKE $${valores.length}`;
  }

  if (puestoRequerido) {
    valores.push(`%${puestoRequerido.trim()}%`);
    query += ` AND o.puesto_requerido ILIKE $${valores.length}`;
  }

  query += ' ORDER BY o.fecha_publicacion DESC';

  const result = await sql.unsafe(query, valores);
  return result;
};


export const cancelarPostulacionByOfertaId = async(id_postulacion)=>{
  await sql`DELETE FROM postulaciones WHERE id =${id_postulacion}`;
}

export const getPostulacionByOfertaAndUsuario = async(id_oferta,id_usuario)=>{
  const postulacion = await sql`SELECT * FROM postulaciones WHERE id_oferta=${id_oferta} AND id_ciudadano=${id_usuario}`;
  return postulacion[0];
}


export const getExperienciaById = async(id_experiencia,id_usuario)=>{
  const experiencia = await sql`SELECT * FROM experiencias_laborales_ciudadanos WHERE id=${id_experiencia} AND id_ciudadano=${id_usuario}`;
  return experiencia[0];
}


export const editarCapacitacionRepository = async(datosActualizados,capacitacion)=>{

  await sql`UPDATE capacitaciones_ciudadanos SET nombre_capacitacion =${datosActualizados.nombre_capacitacion} WHERE id=${capacitacion.id} AND id_ciudadano=${capacitacion.id_ciudadano}`;
  
};

export const eliminarCapacitacionRepository = async(capacitacion)=>{
  await sql`DELETE FROM capacitaciones_ciudadanos WHERE id=${capacitacion.id}`;
}

export const editarExperienciaLaboralRepository = async(datosActualizados,experiencia)=>{
 const camposValidos = ['nombre_empresa', 'desde','hasta','comentario'];

  const campos = [];
  const valores = [];

  for (const [clave, valor] of Object.entries(datosActualizados)) {
    if (camposValidos.includes(clave)) {
      campos.push(`${clave} = $${campos.length + 1}`);
      valores.push(valor);
    }
  }

  if (campos.length === 0) {
    throw new Error('No hay campos válidos para actualizar');
  }

  valores.push(experiencia.id);
  const indexId = valores.length;

  const query = `
    UPDATE experiencias_laborales_ciudadanos
    SET ${campos.join(', ')}
    WHERE id = $${indexId}
  `;

  const result = await sql.unsafe(query, valores); 

  if (result.count === 0 || result.rowCount === 0) {
    throw new Error('No se encontró perfil para actualizar');
  }
};


export const eliminarExperienciaLaboralRepository = async(id_experiencia)=>{
  await sql`DELETE FROM experiencias_laborales_ciudadanos WHERE id=${id_experiencia}`;
};


export const getCvUsuarioRepository = async(id_usuario)=>{

  const url = await sql`SELECT cv_url FROM perfiles_ciudadanos WHERE id_ciudadano=${id_usuario}`;

  return url[0];
};
