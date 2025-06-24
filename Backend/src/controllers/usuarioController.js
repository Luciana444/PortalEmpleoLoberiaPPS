// Controlador para operaciones relacionadas con usuarios.
// Este archivo define la lógica de los endpoints definidos en usuarioRoutes.js.

import { findAllPersonas} from "../services/usuarioService.js"; // Servicio que consulta todos los usuarios

/**
 * Controlador que maneja la petición GET /usuario
 * Llama al servicio que recupera todos los usuarios desde la base de datos
 * y devuelve un array en formato JSON como respuesta.
 */

export const getAllUsuarios = async (req, res) => {
    try {
        // Solicita al servicio la lista completa de usuarios
        const personas = await findAllPersonas();

         // Devuelve la lista con código HTTP 200 (OK)
        return res.status(200).json(personas);
    } catch (error) {
         // En caso de error, lo registra en la consola
        
        console.error(error);
    }
}

