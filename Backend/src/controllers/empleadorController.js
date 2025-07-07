import { updatePerfilEmpresa } from "../services/empleadorService.js";
import { empresaValidation } from "../validations/empresaValidation.js";


//=================================================================
// end point actializar perfil de la empresa
//==================================================================

/**
 * Actualiza el perfil de la empresa asociada al usuario autenticado.
 * 
 * @param {Request} req - Objeto de la solicitud HTTP, debe contener `usuario.id` y los datos a actualizar en `req.body`.
 * @param {Response} res - Objeto de la respuesta HTTP para enviar mensajes de éxito o error.
 * 
 * @returns {Response} - JSON con mensaje de éxito o con detalles de error.
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

