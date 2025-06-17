import {crearEmpleador} from '../services/empleadorService.js';
export const registrarEmpleador = async (req,res) => {
    try {
        const nuevoEmpleador =  await crearEmpleador(req.body);
        res.status(201).json(nuevoEmpleador);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'No se pudo registrar'});
    }
}