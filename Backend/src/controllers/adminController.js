import { getCanPostulacionesTotales,getCantOfertasTotales,obtenerOfertasLaborales,obtenerResumenUsuarios,obtenerReporteVisitas } from "../services/adminService.js";
import PDFDocument from 'pdfkit';



export const getPostulacionesTotales = async(req,res)=>{
   try {
       const postulaciones_totales = await getCanPostulacionesTotales();
       return res.status(200).json(postulaciones_totales);
  }catch (error) {
    console.log(error);
    res.status(500).json({message:'Error al obtener postulaciones totales'});        
   }

};

export const getOfertasLaborales = async (req, res) => {
  try {
    const { estado_publicacion } = req.query;

    const ofertas = await obtenerOfertasLaborales(estado_publicacion);
    res.status(200).json(ofertas);
  } catch (error) {
    console.error('Error al obtener las ofertas laborales:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const getOfertasTotales = async(req,res)=>{
  try {
      const ofertas_totales = await getCantOfertasTotales();
      return res.status(200).json(ofertas_totales);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:'Error al obtener la cantidad de ofertas totales'})
  }

};

export const getResumenUsuarios = async (req, res) => {
  try {
    const resumen = await obtenerResumenUsuarios();
    res.status(200).json(resumen);
  } catch (error) {
    console.error('Error al obtener resumen de usuarios:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const getReporteVisitas = async (req, res) => {
  try {
    const reporte = await obtenerReporteVisitas();
    res.status(200).json(reporte);
  } catch (error) {
    console.error('Error al obtener reporte de visitas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const generarReporteMetricas = async(req,res)=>{
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
      doc.font('Regular').fontSize(12).fillColor('black').text(`• Total de ofertas publicadas al dia de la fecha: ${postulaciones_totales.count}`);
      
      doc.moveDown(9.7);
      doc.font('Bold').fontSize(14).fillColor('black').text('Municipio de Loberia',{align:'center'});

      doc.end();

  } catch (error) {
    console.log(error);
    res.status(500).json({message:'Error al generar el reporte de metricas'})
  }
};