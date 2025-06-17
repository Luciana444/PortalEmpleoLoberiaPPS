import {insertarEmpleador} from '../repositories/empleadorRepository.js';
export const crearEmpleador = async (datos) => {
      try {
        if (!datos.email || !datos.password || !datos.nombre || !datos.apellido) {
            throw new Error("Faltan campos obligatorios");
        }

        const nuevoEmpleador = await insertarEmpleador(datos);
        return nuevoEmpleador;

    } catch (error) {
         console.error(error);
        res.status(500).json({error: 'No se pudo registrar'});
    }
}