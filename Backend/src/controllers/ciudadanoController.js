import { crearCiudadano } from "../services/ciudadanoService.js";
export const registrarCiudadano = async (req, res) => {
    try {
        const nuevoCiudadano = await crearCiudadano(req.body);
        res.status(201).json(nuevoCiudadano);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'No se pudo registrar'});
    }
}

