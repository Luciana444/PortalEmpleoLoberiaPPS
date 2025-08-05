import { getCantOfertasTotalesRepository, getCantPostulacionesTotalesRepository,listarOfertasLaborales,listarResumenUsuarios,listarReporteVisitas, getCiudadanosRepository ,autorizarOfertaRepository, getEmpresasRepository, autorizarEmpresaRepository } from "../repositories/adminRepository.js";
import PDFDocument from 'pdfkit';




export const getCanPostulacionesTotales = async()=>{
  const postulaciones_totales = await getCantPostulacionesTotalesRepository();
  return postulaciones_totales;
};

export const obtenerOfertasLaborales = async (estadoPublicacion) => {
  return await listarOfertasLaborales(estadoPublicacion);
};

export const getCantOfertasTotales = async()=>{
  const ofertas_totales = await getCantOfertasTotalesRepository();
  return ofertas_totales;
};


export const obtenerResumenUsuarios = async () => {
  return await listarResumenUsuarios();
};

export const obtenerReporteVisitas = async () => {
  return await listarReporteVisitas();
};

export const generarReporteMetricasService= async(res)=>{
  try {
    const visitas = await obtenerReporteVisitas();
      const resumen = await obtenerResumenUsuarios();
      const ofertas_totales = await getCantOfertasTotales();
      const postulaciones_totales = await getCanPostulacionesTotales();

      const fecha = new Date(Date.now()).toLocaleDateString('es-AR', { dateStyle: 'long' });
      const doc = new PDFDocument({margin:50});

      res.setHeader('Content-Type', 'application/pdf');

      res.setHeader('Content-Disposition', `inline; filename="Reporte de Metricas (${fecha}).pdf"`);
      doc.registerFont('Regular', 'fonts/OpenSans-Regular.ttf');
      doc.registerFont('Bold', 'fonts/OpenSans-Bold.ttf');

      doc.pipe(res);

      doc.font('Bold').fontSize(30).fillColor('black').text('Reporte de metricas', {align:'center'});
      doc.moveDown(0.5);

      doc.font('Regular').fontSize(14).fillColor('black').text(`Fecha del reporte: ${new Date(Date.now()).toLocaleString('es-AR',{dateStyle:'long'})}`,{align:'center'});
      doc.moveDown(2);

      doc.font('Bold').fontSize(14).fillColor('black').text('Visitas del Portal de Empleo',{underline:true});
      doc.moveDown(0.5);
      doc.font('Regular').fontSize(12).fillColor('#000').text(`• Visitas totales: ${visitas.total_visitas}\n`);
      doc.moveDown(0.2);
      doc.font('Regular').fontSize(12).fillColor('#000').text(`• Visitas de ciudadanos: ${visitas.visitas_ciudadanos}\n`);
      doc.moveDown(0.2);
      doc.font('Regular').fontSize(12).fillColor('#000').text(`• Visitas de empresas: ${visitas.visitas_empresas}\n`);
      doc.moveDown(0.2);
      doc.font('Regular').fontSize(12).fillColor('#000').text(`• Visitas de administradores: ${visitas.visitas_admins}\n`);
      doc.moveDown(0.2);
      doc.font('Regular').fontSize(12).fillColor('#000').text(`• Visitas anonimas: ${visitas.visitas_anonimas}\n`);


      doc.moveDown(2);


      doc.font('Bold').fontSize(14).fillColor('#000').text('Resumen de Usuarios Registrados', {underline:true})
      doc.moveDown(0.5);
      doc.font('Regular').fontSize(12).fillColor('black').text(`• Total de usuarios registrados: ${resumen.total_usuarios}\n`);
      doc.moveDown(0.2)
      doc.font('Regular').fontSize(12).fillColor('black').text(`• Total de usuarios registrados como Ciudadano: ${resumen.total_ciudadanos}\n`);
      doc.moveDown(0.2)
      doc.font('Regular').fontSize(12).fillColor('black').text(`• Total de usuarios registrados como Empresa: ${resumen.total_empresas}\n`);

      doc.moveDown(2);

      doc.font('Bold').fontSize(14).fillColor('#000').text('Resumen de Ofertas Laborales',{underline:true});
      doc.moveDown(0.5);
      doc.font('Regular').fontSize(12).fillColor('black').text(`• Total de ofertas publicadas al dia de la fecha: ${ofertas_totales.count}`);

      doc.moveDown(2);

      doc.font('Bold').fontSize(14).fillColor('black').text('Resumen de Postulaciones a Ofertas Laborales',{underline:true});
      doc.moveDown(0.5);
      doc.font('Regular').fontSize(12).fillColor('black').text(`• Total de postulaciones realizadas al dia de la fecha: ${postulaciones_totales.count}`);
      
      doc.moveDown(9.7);
      doc.font('Bold').fontSize(14).fillColor('black').text('Municipio de Loberia',{align:'center'});

      doc.end();

  } catch (error) {
    
  }
}

export const getCiudadanos = async()=>{
  const lista = await getCiudadanosRepository();
  return lista;
};


export const autorizarOfertaLaboral = async(email,id_oferta,estado_publicacion)=>{
  await autorizarOfertaRepository(email,id_oferta,estado_publicacion);
};

export const getListaEmpresasService = async()=>{
  const lista_empresas = await getEmpresasRepository();
  return lista_empresas;
}

export const autorizarEmpresaService = async(email,id_empresa,estado_publicacion)=>{
  await autorizarEmpresaRepository(email,id_empresa,estado_publicacion);
};