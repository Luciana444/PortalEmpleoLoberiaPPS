

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


--------------------------------------------------------
Esto para guardar junto a la aprobacion de las empresas y de las ofertas la fecha y quien la
aprobo o rechazo... 

⚙️ Configuración del Endpoint para Aprobar Empresas

✅ Requisitos:
Cuando un administrador aprueba o rechaza una empresa, el sistema debe:
- Cambiar el estado_aprobacion.
- Registrar la fecha actual.
- Guardar el email del administrador que lo hizo.

🔐 Asegurarse de que el token JWT contenga el email del usuario administrador:
Ejemplo al generar el token al hacer login:

const token = jwt.sign({
  id_usuario: usuario.id_usuario,
  email: usuario.email,
  tipo_usuario: usuario.tipo_usuario
}, process.env.JWT_SECRET, { expiresIn: '2h' });

Este email estará disponible en req.usuarioAutenticado después de pasar por el middleware verificarToken.

🛠️ Ruta PUT protegida para autorizar empresas:

// En routes/empresas.js (o similar)
router.put('/empresas/:id/autorizar', verificarToken, verificarAdmin, async (req, res) => {
  const { id } = req.params;
  const { estado_aprobacion } = req.body;
  const email_admin = req.usuarioAutenticado.email;
  const fecha = new Date();

  try {
    await pool.query(
      `UPDATE empresas
       SET estado_aprobacion = $1,
           email_admin_autorizador = $2,
           fecha_aprobacion = $3
       WHERE id_empresa = $4`,
      [estado_aprobacion, email_admin, fecha, id]
    );

    res.json({ mensaje: 'Empresa actualizada correctamente' });
  } catch (error) {
    console.error('Error al autorizar empresa:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

✅ Esta ruta:
- Requiere un token válido con tipo_usuario: 'admin'.
- Usa el email del token para registrar quién autorizó.
- Usa la hora actual para guardar cuándo se hizo.

 Repetir algo similar para ofertas laborales, pero usando el campo estado_publicacion.