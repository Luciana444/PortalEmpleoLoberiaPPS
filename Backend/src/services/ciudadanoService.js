import { insertarCiudadano } from "../repositories/ciudadanoRepository.js";
export const crearCiudadano = async (datos) => {
        /*if (!datos.email || !datos.password || !datos.nombre || !datos.apellido) {
            throw new Error("Faltan campos obligatorios");
        }*/

        const nuevoCiudadano = await insertarCiudadano(datos);
        return nuevoCiudadano;
};