import { getUsuarioById } from "../controllers/usuarioController.js";
import { crearPostulacionRepository, getCapacitacionesByCiudadanoId, getExperienciaByCiudadanoId,insertarUrlCv, verificarUsuarioPostulado } from "../repositories/ciudadanoRepository.js";
import { updatePerfilCiudadano,insertExperienciaLaboral,insertCapacitacion,obtenerPostulacionesRepository  } from '../repositories/ciudadanoRepository.js';
import PDFDocument from 'pdfkit';



//==============================================================
/**
 * Guarda la URL del archivo CV en la base de datos del ciudadano.
 * 
 * Esta función actúa como intermediaria entre el controller y el repositorio,
 * delegando la operación de inserción a la función `insertarUrlCv`.
 * 
 * @async
 * @function subirCvBD
 * @param {string} id_usuario - ID del usuario ciudadano al que se le asociará el CV.
 * @param {string} url_cv - URL donde se almacenó el archivo CV.
 * 
 * @returns {Promise<any>} Resultado de la operación de inserción.
 */

export const subirCvBD = async(id_usuario,url_cv)=>{
    return await insertarUrlCv(id_usuario, url_cv);
}


//=================================================================
/**
 * Actualiza los datos del perfil de un ciudadano en la base de datos.
 * 
 * Esta función actúa como puente entre el controller y el repositorio,
 * delegando la actualización al método `updatePerfilCiudadano`.
 * 
 * @async
 * @function actualizarPerfil
 * @param {string} userId - ID del ciudadano cuyo perfil se desea actualizar.
 * @param {Object} datos - Objeto con los campos a actualizar (validados previamente).
 * 
 * @throws {Error} Propaga errores que puedan ocurrir durante la operación de base de datos.
 */


export const actualizarPerfil = async (userId, datos) => {
  try {
    await updatePerfilCiudadano(userId, datos);
  } catch (error) {
    throw error;
  }
};

//==========================================================================

/**
 * Agrega una nueva experiencia laboral al perfil del ciudadano.
 * 
 * Llama al repositorio para insertar los datos de experiencia laboral
 * asociados al ID del ciudadano correspondiente.
 * 
 * @async
 * @function agregarExperienciaLaboral
 * @param {string} userId - ID del ciudadano al que se asocia la experiencia.
 * @param {Object} experiencia - Objeto que contiene los datos de la experiencia laboral:
 *   - {string} nombre_empresa
 *   - {string} desde (formato ISO)
 *   - {string} [hasta] (formato ISO, opcional)
 *   - {string} [comentario] (opcional)
 * 
 * @throws {Error} Propaga errores de la capa de acceso a datos.
 */

export const agregarExperienciaLaboral = async (userId, experiencia) => {
  try {
    await insertExperienciaLaboral(userId, experiencia);
  } catch (error) {
    throw error;
  }
};

//====================================================================

/**
 * Registra una nueva capacitación para el ciudadano en la base de datos.
 * 
 * Esta función delega la inserción al repositorio, asociando el nombre
 * de la capacitación con el ID del ciudadano correspondiente.
 * 
 * @async
 * @function agregarCapacitacion
 * @param {string} userId - ID del ciudadano que realizó la capacitación.
 * @param {string} nombreCapacitacion - Nombre o descripción de la capacitación.
 * 
 * @throws {Error} Propaga errores ocurridos durante la inserción.
 */

export const agregarCapacitacion = async (userId, nombreCapacitacion) => {
  try {
    await insertCapacitacion(userId, nombreCapacitacion);
  } catch (error) {
    throw error;
  }
};

//=====================================================================
/**
 * Genera un CV en formato PDF para un ciudadano autenticado y lo envía como respuesta HTTP.
 * 
 * Esta función consulta los datos del usuario, sus experiencias laborales y capacitaciones,
 * construye un documento PDF y lo transmite directamente al navegador mediante `res.pipe()`.
 * 
 * @async
 * @function generarPdfUsuario
 * @param {string} id - ID del ciudadano que solicita generar su CV.
 * @param {object} res - Objeto de respuesta de Express para enviar el archivo PDF.
 * 
 * @throws {Error} Si no se encuentra el usuario o ocurre un error al generar el PDF.
 */


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

//===============================================================================================
// servico: get  perfil completo
//===============================================================================================

/**
 * Recupera el perfil completo del ciudadano, incluyendo sus datos personales,
 * capacitaciones realizadas y experiencias laborales.
 *
 * @futnction
 * @async
 * @param {string} userId - ID del ciudadano (UUID) autenticado.
 * @returns {Promise<Object>} Un objeto con los datos del perfil, capacitaciones y experiencias laborales.
 *
 * @example
 * {
 *   nombre: "Juan",
 *   apellido: "Pérez",
 *   email: "juan@email.com",
 *   ...otros campos del perfil,
 *   capacitaciones: [ ... ],
 *   experiencias_laborales: [ ... ]
 * }
 *
 * @throws {Error} Puede lanzar un error si ocurre un fallo en los repositorios subyacentes.
 */


//============================================================00
/**
 * Obtiene el perfil completo de un ciudadano, incluyendo sus datos personales,
 * capacitaciones y experiencias laborales.
 * 
 * Esta función consolida la información de distintas fuentes (repositorios) y
 * retorna un único objeto con todos los datos combinados.
 * 
 * @async
 * @function getPerfilCompleto
 * @param {string} userId - ID del ciudadano autenticado.
 * @returns {Promise<Object>} Objeto con la información del perfil, capacitaciones y experiencias.
 * 
 * @throws {Error} Propaga cualquier error ocurrido al consultar los datos en los repositorios.
 */

import { fetchPerfilCiudadano, fetchCapacitaciones, fetchExperiencias } from '../repositories/ciudadanoRepository.js';

export const getPerfilCompleto = async (userId) => {
  const perfil = await fetchPerfilCiudadano(userId);
  const capacitaciones = await fetchCapacitaciones(userId);
  const experiencias = await fetchExperiencias(userId);

  return {
    ...perfil,
    capacitaciones,
    experiencias_laborales: experiencias
  };
};
//======================================================================0

export const obtenerPostulacionesService = async (idCiudadano) => {
  return await obtenerPostulacionesRepository(idCiudadano);
};




export const crearPostulacion = async(id_oferta,id_usuario,mensaje,url_cv)=>{
  try {
      await crearPostulacionRepository(id_oferta,id_usuario,mensaje,url_cv);
  } catch (error) {
      console.log(error);
  }
};

export const verificarPostulacion = async(id_oferta,id_usuario)=>{
  try {
    const verificacion = await verificarUsuarioPostulado(id_oferta,id_usuario);
    return verificacion;
  } catch (error) {
    console.log(error);
  }
};