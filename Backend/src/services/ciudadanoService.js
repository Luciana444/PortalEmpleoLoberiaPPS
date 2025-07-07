import { getUsuarioById } from "../controllers/usuarioController.js";
import { getCapacitacionesByCiudadanoId, getExperienciaByCiudadanoId,insertarUrlCv } from "../repositories/ciudadanoRepository.js";
import { updatePerfilCiudadano,insertExperienciaLaboral,insertCapacitacion } from '../repositories/ciudadanoRepository.js';
import PDFDocument from 'pdfkit';

export const subirCvBD = async(id_usuario,url_cv)=>{
    return await insertarUrlCv(id_usuario, url_cv);
}



export const actualizarPerfil = async (userId, datos) => {
  try {
    await updatePerfilCiudadano(userId, datos);
  } catch (error) {
    throw error;
  }
};

export const agregarExperienciaLaboral = async (userId, experiencia) => {
  try {
    await insertExperienciaLaboral(userId, experiencia);
  } catch (error) {
    throw error;
  }
};

export const agregarCapacitacion = async (userId, nombreCapacitacion) => {
  try {
    await insertCapacitacion(userId, nombreCapacitacion);
  } catch (error) {
    throw error;
  }
};


export const generarPdfUsuario = async (id,res) =>{
  try {
     const usuario = await getUsuarioById(id);
     const experiencia = await getExperienciaByCiudadanoId(id);
     const capacitacion = await getCapacitacionesByCiudadanoId(id);
     if(usuario){
            
        const doc = new PDFDocument({ margin: 50 });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=cv.pdf');
        doc.registerFont('Regular', 'fonts/OpenSans-Regular.ttf');
        doc.registerFont('Bold', 'fonts/OpenSans-Bold.ttf');

        doc.pipe(res);


        doc.fontSize(30).fillColor('black').text(`${usuario.nombre} ${usuario.apellido}`, { align: 'center' });
        doc.moveDown(0.5);
        doc.fontSize(12).fillColor('gray').text(`Correo: ${usuario.email}`, { align: 'center' });
        doc.moveDown(0.2);
        doc.fontSize(12).fillColor('gray').text(`Telefono: ${usuario.telefono}`, { align: 'center' });
        doc.moveDown(2);


        doc.moveTo(50, doc.y).lineTo(570, doc.y).stroke();


        doc.moveDown(1);
        doc.font('Bold').fontSize(16).fillColor('#000').text('Perfil', { underline: true });
        doc.moveDown(0.5);
        doc.font('Regular').fontSize(12).text('Soy un ciudadano registrado en el portal de empleo de la municipalidad, con interés en oportunidades laborales acordes a mi perfil.');

        doc.moveDown(1.5);
        doc.font('Bold').fontSize(16).fillColor('#000').text('Habilidades', { underline: true });
        doc.moveDown(0.5);
        doc.font('Regular').fontSize(12).text('• Responsabilidad\n• Trabajo en equipo\n• Compromiso con el empleo público');

        doc.moveDown(1.5);
        if(experiencia){
          doc.font('Bold').fontSize(16).fillColor('#000').text('Experiencia', { underline: true });
          doc.moveDown(0.5);
          for(let e of experiencia){
            doc.font('Bold').fontSize(12).fillColor('black').text(`${e.nombre_empresa} (${e.desde.toLocaleString('es-AR',{month:'long', year: 'numeric'})} - ${e.hasta != null? e.hasta.toLocaleString('es-AR',{month:'long', year:'numeric'}):'Actualidad'})`);
            doc.moveDown(0.5);
            doc.font('Regular').fontSize(12).fillColor('black').text(`• ${e.comentario}\n`);
            doc.moveDown(1);
          }
        }
        doc.moveDown(0.5);
        if(capacitacion){
          doc.font('Bold').fontSize(16).fillColor('black').text('Capacitaciones', {underline:true});
          doc.moveDown(0.5);
          for(let c of capacitacion){
            doc.font('Regular').fontSize(12).fillColor('black').text(`• ${c.nombre_capacitacion}`);
            doc.moveDown(1.2);
          }
        }


        doc.end();
     }else{
        throw new Error('El usuario no existe');
     }

  } catch (error) {
    console.log(error);
  }
}
