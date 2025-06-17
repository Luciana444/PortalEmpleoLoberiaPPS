import { findAllPersonas , getPersonaByEmail as getPersonFromDB} from "../services/personaService.js";
export const getAllPersonas = async (req, res) => {
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