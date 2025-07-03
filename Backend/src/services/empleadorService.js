import { updatePerfilEmpresaById } from "../repositories/empleadorRepository.js";


export const updatePerfilEmpresa = async (id_usuario,datosActualizados)=>{
    try {
        await updatePerfilEmpresaById(id_usuario,datosActualizados);
    } catch (error) {
        console.log(error);
    }
}