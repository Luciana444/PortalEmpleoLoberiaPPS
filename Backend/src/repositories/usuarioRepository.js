import sql from '../database/db.js';

export const findAll = async () =>{
    try {
        const usuarios = await sql`SELECT * FROM usuarios`
        return console.log(usuarios);
    } catch (error) {
        console.error(error);
    }
}


export const findPersonaByEmail = async (email) =>{
    try {
        return await sql`SELECT * FROM usuarios WHERE email = ${email}`;
    } catch (error) {
        console.log(error);
    }
}

//-------------------------------------------------------------------

export const existeNombre = async (nombre) => {
  const result = await sql`SELECT id FROM usuarios WHERE nombre = ${nombre}`;
  return result.length > 0;
};

export const crearUsuario = async ({ nombre, hashedPassword }) => {
  const result = await sql`
    INSERT INTO usuarios (nombre, contraseña, fecha_registro, estado)
    VALUES (${nombre}, ${hashedPassword}, NOW(), 'activo')
    RETURNING id
  `;
  return result[0].id;
};