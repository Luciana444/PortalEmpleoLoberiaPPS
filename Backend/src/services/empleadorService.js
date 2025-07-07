import { getDatosEmpresaById, updatePerfilEmpresaById } from "../repositories/empleadorRepository.js";


export const updatePerfilEmpresa = async (id_usuario,datosActualizados)=>{
    try {
        await updatePerfilEmpresaById(id_usuario,datosActualizados);
    } catch (error) {
        console.log(error);
    }
}


export const getDatosEmpresa = async(id_usuario)=>{
    try {
        const datos = await getDatosEmpresaById(id_usuario);
        return datos;
    } catch (error) {
        console.log(error);
    }
}