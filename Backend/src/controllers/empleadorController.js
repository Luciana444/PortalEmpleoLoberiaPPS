import { updatePerfilEmpresa } from "../services/empleadorService.js";
import { empresaValidation } from "../validations/empresaValidation.js";



export const actualizarPerfilEmpresa = async(req,res)=>{
    try {
        const id_usuario = req.usuario.id;
        if (!id_usuario) {
          return res.status(400).json({ error: 'Falta el id de la empresa' });
        }

        const {error} = empresaValidation.validate(req.body, {abortEarly:false});

        if(error){
            return res.status(400).json({
                errores:error.details.map(d=>d.message)
            })
        }

        await updatePerfilEmpresa(id_usuario, req.body);
    
        res.status(200).json({ message: 'Perfil actualizado correctamente' });
      } catch (error) {
        console.error('Error actualizando perfil:', error);
        res.status(500).json({ error: 'Error al actualizar el perfil' });
      }

}
