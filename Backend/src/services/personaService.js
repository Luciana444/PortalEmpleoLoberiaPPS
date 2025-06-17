import { findAll, findPersonaByEmail } from "../repositories/personaRepository.js";


export const findAllPersonas = async () => {
    try {
        const usuarios = await findAll();
        console.log(usuarios);
    } catch (error) {
        console.error(error);
    }
};


export const getPersonaByEmail = async (email)=>{
    try {
        const persona = await findPersonaByEmail(email);
        console.log(persona)
    } catch (error) {
        console.log(error);
    }
}