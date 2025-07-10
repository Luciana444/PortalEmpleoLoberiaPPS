import sql from '../database/db.js'

/**
 * Actualiza el perfil de la empresa en la base de datos filtrando solo los campos válidos.
 *
 * @param {string|number} id_usuario - ID del usuario/empresa que se desea actualizar.
 * @param {Object} datosActualizados - Objeto con los campos y valores a actualizar.
 *
 * @throws {Error} Si falta el id_usuario o no se envían campos válidos para actualizar.
 *
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la actualización.
 */

export const updatePerfilEmpresaById= async(id_usuario,datosActualizados)=>{

     // Lista de campos que se permiten actualizar
    if(!id_usuario){
        throw new Error('Falta el id de la empresa');
    }

    const camposValidos = [
    'nombre_empresa',
    'email_contacto',
    'sitio_web',
    'cuit',
    'rubro',
    'telefono',
    'calle',
    'numero',
    'piso',
    'dpto',
    'localidad',
    'provincia',
    'pais'
    ]

     // Filtra solo los campos válidos presentes en datosActualizados
    const campos = Object.keys(datosActualizados).filter(campo => camposValidos.includes(campo));

    if(campos.length === 0){
        throw new Error('No se enviaron campos validos para actualizar el perfil');
    }

  // Construye la parte SET de la consulta SQL con parámetros posicionados  
    const partesSet = campos.map((campo,i)=> `"${campo}" = $${i + 1}`);

     // Valores ordenados para los parámetros de la consulta
    const valores = campos.map(campo => datosActualizados[campo]);
// Consulta SQL completa con WHERE para filtrar por id_usuario
    const consulta = `UPDATE empresas SET ${partesSet.join(', ')} WHERE id_usuario = $${campos.length+1}`;

     // Ejecuta la consulta con sql.unsafe (evitando inyección, asumiendo que sql está bien configurado)
    await sql.unsafe(consulta, [...valores, id_usuario]);

}

//=================================================
//obtiene los datos de la empresa
//============================================

export const getDatosEmpresaById = async(id_usuario)=>{
    const resultado = await sql`SELECT * FROM empresas WHERE id_usuario = ${id_usuario}`;
    return resultado[0];
};


export const getOfertasByEmpresaId = async (idEmpresa, estadoPublicacion) => {
  if (estadoPublicacion) {
    return await sql`
      SELECT 
        id, puesto_requerido, descripcion, nivel_educativo_requerido, experiencia_requerida, 
        otros_requisitos, lugar_trabajo, modalidad, tipo_contrato, 
        fecha_publicacion, fecha_cierre, estado, estado_publicacion, localidad_del_puesto
      FROM ofertas_laborales
      WHERE id_empresa = ${idEmpresa} AND estado_publicacion = ${estadoPublicacion}
      ORDER BY fecha_publicacion DESC
    `;
  }

  // sin filtro (todas las ofertas de esa empresa)
  return await sql`
    SELECT 
      id, puesto_requerido, descripcion, nivel_educativo_requerido, experiencia_requerida, 
      otros_requisitos, lugar_trabajo, modalidad, tipo_contrato, 
      fecha_publicacion, fecha_cierre, estado, estado_publicacion, localidad_del_puesto
    FROM ofertas_laborales
    WHERE id_empresa = ${idEmpresa}
    ORDER BY fecha_publicacion DESC
  `;
};



export const getOfertasActivas = async () => {
  return await sql`
    SELECT 
      id, id_empresa, puesto_requerido, descripcion, nivel_educativo_requerido,
      experiencia_requerida, otros_requisitos, lugar_trabajo, modalidad,
      tipo_contrato, fecha_publicacion, fecha_cierre, estado, estado_publicacion,
      localidad_del_puesto
    FROM ofertas_laborales
    WHERE estado = 'activa' AND estado_publicacion = 'aprobada'
    ORDER BY fecha_publicacion DESC
  `;
};


export const crearOfertaNueva = async (id_empresa, datosOferta)=>{
    const {
        puesto_requerido, descripcion, nivel_educativo_requerido, experiencia_requerida, otros_requisitos,
        lugar_trabajo, modalidad, tipo_contrato, fecha_cierre, localidad_del_puesto
     } = datosOferta;

  const result = await sql`
    INSERT INTO ofertas_laborales (
      id_empresa, puesto_requerido, descripcion, nivel_educativo_requerido, experiencia_requerida,
      otros_requisitos, lugar_trabajo, modalidad, tipo_contrato, fecha_cierre, localidad_del_puesto)
    VALUES (
      ${id_empresa}, ${puesto_requerido}, ${descripcion}, ${nivel_educativo_requerido}, ${experiencia_requerida??null},
      ${otros_requisitos ?? null}, ${lugar_trabajo}, ${modalidad}, ${tipo_contrato??null}, ${fecha_cierre??null},
      ${localidad_del_puesto??null})
    RETURNING *;
  `;
  return result[0];

}

export const deleteOfertaById = async (idOferta) => {
  await sql`
    DELETE FROM ofertas_laborales WHERE id = ${idOferta}
  `;
};

export const buscarOfertaPorId = async (idOferta) => {
  const result = await sql`
    SELECT * FROM ofertas_laborales WHERE id = ${idOferta}
  `;
  return result[0] || null;
};