import sql from "../database/db.js";


export const getCantPostulacionesTotalesRepository = async()=>{
  const postulaciones_totales = await sql`SELECT COUNT(*) FROM postulaciones`;
  return postulaciones_totales[0];
};

export const listarOfertasLaborales = async (estadoPublicacion) => {
  if (!estadoPublicacion) {
    //por defecto mostramos el listado de las ofertas pendientes
    estadoPublicacion = 'pendiente';
  }

  const resultados = await sql`
    SELECT 
      o.id,
      o.id_empresa,
      e.nombre_empresa,
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
      o.email_admin_autorizador,
      o.localidad_del_puesto
    FROM ofertas_laborales o
    JOIN empresas e ON o.id_empresa = e.id_usuario
    WHERE o.estado_publicacion = ${estadoPublicacion}
    ORDER BY o.fecha_publicacion DESC
  `;
  return resultados;
};


export const getCantOfertasTotalesRepository = async()=>{
  const ofertas_totales = await sql`SELECT COUNT(*) FROM ofertas_laborales`;
  return ofertas_totales[0];
}

export const listarResumenUsuarios = async () => {
  const result = await sql`
    SELECT
      (SELECT COUNT(*) FROM usuarios WHERE estado = true AND tipo_usuario IN ('ciudadano', 'empresa')) AS total_usuarios,
      (SELECT COUNT(*) FROM usuarios WHERE tipo_usuario = 'ciudadano' AND estado = true) AS total_ciudadanos,
      (SELECT COUNT(*) FROM usuarios WHERE tipo_usuario = 'empresa' AND estado = true) AS total_empresas
  `;
  return result[0];
};


export const listarReporteVisitas = async () => {
  const result = await sql`
    SELECT
      COUNT(*) AS total_visitas,
      COUNT(*) FILTER (WHERE tipo_usuario = 'ciudadano') AS visitas_ciudadanos,
      COUNT(*) FILTER (WHERE tipo_usuario = 'empresa') AS visitas_empresas,
      COUNT(*) FILTER (WHERE tipo_usuario = 'admin') AS visitas_admins,
      COUNT(*) FILTER (WHERE tipo_usuario IS NULL) AS visitas_anonimas
    FROM visitas_portal
  `;


  return result[0];
};


export const getCiudadanosRepository = async()=>{
  const result = await sql`SELECT * FROM perfiles_ciudadanos`;
  return result;
}


export const autorizarOfertaRepository = async(email,id_oferta,estado_publicacion)=>{
  await sql`UPDATE ofertas_laborales SET email_admin_autorizador=${email}, estado_publicacion=${estado_publicacion}, 
  fecha_aprobacion = NOW() WHERE id=${id_oferta}`;
};

export const getEmpresasRepository = async()=>{
  const result = await sql`SELECT * FROM empresas`;
  return result;
};

export const autorizarEmpresaRepository = async(email,id_empresa,estado_publicacion)=>{
  await sql`UPDATE empresas SET email_admin_autorizador=${email}, estado_aprobacion=${estado_publicacion}, 
  fecha_aprobacion = NOW() WHERE id_usuario=${id_empresa}`;
};