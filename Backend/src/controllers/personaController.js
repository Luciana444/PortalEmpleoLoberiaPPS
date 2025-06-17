import { findAllPersonas } from "../services/personaService.js";
export const getAllPersonas = async (req, res) => {
    try {
        const personas = await findAllPersonas();
        res.status(200).json(personas);
    } catch (error) {
        console.error(error);
    }
}