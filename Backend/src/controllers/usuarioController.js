import { findAllPersonas , getPersonaByEmail as getPersonFromDB} from "../services/usuarioService.js";
export const getAllUsuarios = async (req, res) => {
    try {
        const personas = await findAllPersonas();
        res.status(200).json(personas);
    } catch (error) {
        console.error(error);
    }
}


export const getPersonaByEmail = async (req,res)=>{
    try {
        const {email} = req.body;
        const persona = await getPersonFromDB(email);
        return persona;
    } catch (error) {
        console.log(error)
    }
}