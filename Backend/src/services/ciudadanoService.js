import { getUsuarioById } from "../controllers/usuarioController.js";
import { insertarUrlCv } from "../repositories/ciudadanoRepository.js";
import { updatePerfilCiudadano } from '../repositories/ciudadanoRepository.js';
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


export const generarPdfUsuario = async (id,res) =>{
  try {
     const usuario = await getUsuarioById(id);
     if(usuario){
            
        const doc = new PDFDocument({ margin: 50 });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=cv.pdf');

        doc.pipe(res);


        doc.fontSize(30).fillColor('#333').text(`${usuario.nombre}${usuario.apellido}`, { align: 'center' });
        doc.moveDown(0.5);
        doc.fontSize(12).fillColor('gray').text(`Correo: ${usuario.email}`, { align: 'center' });
        doc.moveDown(0.2);
        doc.fontSize(12).fillColor('gray').text(`Telefono: ${usuario.telefono}`, { align: 'center' });
        doc.moveDown(2);


        doc.moveTo(50, doc.y).lineTo(570, doc.y).stroke();


        doc.moveDown(1);
        doc.fontSize(16).fillColor('#333').text('Perfil', { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(12).text('Soy un ciudadano registrado en el portal de empleo de la municipalidad, con interés en oportunidades laborales acordes a mi perfil.');

        doc.moveDown(1.5);
        doc.fontSize(16).fillColor('#333').text('Habilidades', { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(12).text('• Responsabilidad\n• Trabajo en equipo\n• Compromiso con el empleo público');

        doc.end();
     }else{
        throw new Error('El usuario no existe');
     }

  } catch (error) {
    console.log(error);
  }
}
