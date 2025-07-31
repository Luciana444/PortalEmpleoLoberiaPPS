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