// Repositorio de acceso a la tabla `usuarios` y tablas relacionadas (tokens).
// Encapsula toda la lógica de consulta y modificación en la base de datos PostgreSQL.

import sql from '../database/db.js';

//================================================================
/**
 * Recupera todos los usuarios de la tabla `usuarios`.
 * Esta función debería retornar los datos, pero actualmente imprime en consola.
 */
//===============================================================

export const findAll = async () =>{
    try {
        const usuarios = await sql`SELECT nombre, email, tipo_usuario FROM usuarios`
        return usuarios;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//===================================================================
/**
 * Verifica si un email ya existe en la base de datos.
 * Devuelve true si el email está registrado, false si no lo está.
 */

//================================================================

//funcion llamada desde el service, verifica si ya existe el email (que se  pasa por parametros) en la base de datos

export const existeEmail = async (email) => {
  const result = await sql`SELECT id FROM usuarios WHERE email = ${email}`;
  return result.length > 0;
};

//================================================================
/**
 * Inserta un nuevo usuario en la base de datos.
 * Recibe un objeto con los campos requeridos.
 * Devuelve el ID generado del nuevo usuario.
 */
//====================================================================

export const crearUsuario = async ({ nombre, email, contrasena, tipo_usuario }) => {
  const result = await sql`
    INSERT INTO usuarios (nombre, email, contrasena, fecha_registro, estado, tipo_usuario)
    VALUES (${nombre}, ${email}, ${contrasena}, NOW(), true, ${tipo_usuario})
    RETURNING id
  `;
  return result[0].id;
};

//=====================================================================
/**
 * Busca un usuario por su email.
 * Devuelve el primer usuario encontrado o `null` si no existe.
 */
//======================================================================

//verifica que en la tabla exista el email del usuario
export const findUserByEmail = async (email) => {
  const result = await sql`
    SELECT * FROM usuarios WHERE email = ${email} LIMIT 1
  `;
  return result[0] || null;
};

//actualiza en la base de datos la nueva contraseña del usuario
export const actualizarContrasena = async (userId, nuevaContrasenaHash) => {
  await sql`
    UPDATE usuarios SET contrasena = ${nuevaContrasenaHash} WHERE id = ${userId}
  `;
};



export const actualizarFotoPerfil = async (userId, rutaFoto, tipoUsuario) => {
  if (!userId || !rutaFoto || !tipoUsuario) {
    throw new Error('Faltan parámetros para actualizar foto');
  }

  console.log('Tipo de usuario recibido:', tipoUsuario);
const tipo = tipoUsuario.trim().toLowerCase();

if (tipo === 'empresa') {
  await sql`
    UPDATE empresas
    SET logo = ${rutaFoto}
    WHERE id_usuario = ${userId}
  `;
} else if (tipo === 'ciudadano') {
  await sql`
    UPDATE perfiles_ciudadanos
    SET imagen_url = ${rutaFoto}
    WHERE id_ciudadano = ${userId}
  `;
} else {
  throw new Error('Tipo de usuario no válido');
}
};

export const findUserById = async(id)=>{
  if(!id){
    throw new Error('Falta el id del usuario');
  }
  const result = await sql`SELECT * FROM perfiles_ciudadanos WHERE id_ciudadano = ${id}`;
  return result[0];
}