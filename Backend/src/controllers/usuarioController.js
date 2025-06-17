import { findAllPersonas} from "../services/usuarioService.js";
export const getAllUsuarios = async (req, res) => {
    try {
        const personas = await findAllPersonas();
        res.status(200).json(personas);
    } catch (error) {
        console.error(error);
    }
}

