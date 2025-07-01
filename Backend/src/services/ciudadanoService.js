import { insertarUrlCv } from "../repositories/ciudadanoRepository.js";


export const subirCvBD = async(id_usuario,url_cv)=>{
    return await insertarUrlCv(id_usuario, url_cv);
}