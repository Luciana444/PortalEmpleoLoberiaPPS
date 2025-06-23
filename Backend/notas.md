

Notas generales:
En usuariosControllers , en esta funcion: 

export const getAllUsuarios = async (req, res) => {
    try {
        // Solicita al servicio la lista completa de usuarios
        const personas = await findAllPersonas();

         // Devuelve la lista con código HTTP 200 (OK)
        res.status(200).json(personas);
    } catch (error) {
         // En caso de error, lo registra en la consola
        
       
        console.error(error);
    }
}

//se recomienda una captura de errores mas robusta..


______________________________

En usuarioRepository, no esta devolviendo la lista de usuarios, solo los muestra por consola: cambiar por esto:
export const findAll = async () => {
  try {
    const usuarios = await sql`SELECT * FROM usuarios`;
    return usuarios; // ✅ Ahora devuelve la lista al controller
  } catch (error) {
    console.error(error);
    throw error; // Opcional: propaga el error hacia el controller
  }
};

-----------------------------------

En ususarioService tambien habria que cambiar a esto la funcion findAll: 

export const findAllPersonas = async () => {
  try {
    const usuarios = await findAll(); // Consulta a la base de datos
    return usuarios; // Devuelve los datos al controller
  } catch (error) {
    console.error(error);
    throw error; // Propaga el error para que el controller lo maneje
  }
};
