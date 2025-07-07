import { getDatosEmpresa, updatePerfilEmpresa } from "../services/empleadorService.js";
import { empresaValidation } from "../validations/empresaValidation.js";


//=================================================================
// end point actializar perfil de la empresa
//==================================================================
/**
 * Actualiza los datos del perfil de una empresa autenticada.
 *
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} req.usuario - Usuario autenticado con su ID.
 * @param {Object} req.body - Datos a actualizar en el perfil de la empresa.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {void}
 *
 * @throws {400} Si falta el ID del usuario o si los datos no pasan la validación.
 * @throws {500} Si ocurre un error en la actualización.
 */


export const actualizarPerfilEmpresa = async(req,res)=>{
    try {
        const id_usuario = req.usuario.id;
        if (!id_usuario) {
          // Si no existe id en el usuario autenticado, error 400
          return res.status(400).json({ error: 'Falta el id de la empresa' });
        }
         // Validación de los datos recibidos en req.body según esquema empresaValidation
        const {error} = empresaValidation.validate(req.body, {abortEarly:false});

        if(error){
          // Si hay errores de validación, responder con detalles y status 400
            return res.status(400).json({
                errores:error.details.map(d=>d.message)
            })
        }

        // Actualiza perfil en la base de datos (función definida en el service)
        await updatePerfilEmpresa(id_usuario, req.body);

        // Respuesta exitosa
        res.status(200).json({ message: 'Perfil actualizado correctamente' });
      } catch (error) {
        // Loguea el error y responde con error 500
        console.error('Error actualizando perfil:', error);
        res.status(500).json({ error: 'Error al actualizar el perfil' });
      }

}

//=======================================================================

/**
 * Obtiene los datos del perfil de la empresa autenticada.
 *
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} req.usuario - Objeto que contiene el ID del usuario autenticado.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {void}
 *
 * @throws {404} Si no se encuentra el ID del usuario en el token.
 * @throws {500} Si ocurre un error al recuperar los datos desde la base de datos.
 */


export const obtenerDatosEmpresa = async (req,res)=>{
  try {
    const id_usuario = req.usuario.id;
    if(!id_usuario){
      return res.status(404).json({message: 'Falta el id del usuario'});
    }

    const datosEmpresa = await getDatosEmpresa(id_usuario);

    return res.status(200).json(datosEmpresa);

  } catch (error) {
    console.log(error);
    res.status(500).json({error:'Error al obtener los datos de la empresa'});
  }
}

