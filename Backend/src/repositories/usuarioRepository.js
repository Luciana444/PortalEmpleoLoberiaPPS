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
        const result = await sql`SELECT * FROM usuarios WHERE email = ${email}`;
        return result[0];
    } catch (error) {
        console.log(error);
    }
}

//-------------------------------------------------------------------

export const existeEmail = async (email) => {
  const result = await sql`SELECT id FROM usuarios WHERE email = ${email}`;
  return result.length > 0;
};

export const crearUsuario = async ({ nombre, email, contrasena, tipo_usuario }) => {
  const result = await sql`
    INSERT INTO usuarios (nombre, email, contrasena, fecha_registro, estado, tipo_usuario)
    VALUES (${nombre}, ${email}, ${contrasena}, NOW(), true, ${tipo_usuario})
    RETURNING id
  `;
  return result[0].id;
};