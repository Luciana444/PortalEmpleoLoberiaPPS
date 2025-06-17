import { findAll } from "../repositories/personaRepository.js";
export const findAllPersonas = async () => {
    try {
        return await findAll();
    } catch (error) {
        console.error(error);
    }
};