import sql from '../database/db.js';

export const findAll = async () =>{
    try {
        const usuarios = await sql`SELECT * FROM usuarios`
        return console.log(usuarios);
    } catch (error) {
        console.error(error);
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


export const findUserByEmail = async (email) => {
  const result = await sql`
    SELECT * FROM usuarios WHERE email = ${email} LIMIT 1
  `;
  return result[0] || null;
};

export const savePasswordResetToken = async (userId, token) => {
  const expiration = new Date(Date.now() + 3600000).toISOString();

 await sql`
  INSERT INTO tokens_invalidados (id_user, token, expires_at)
  VALUES (${userId}, ${token}, ${expiration})
  ON CONFLICT (id_user) DO UPDATE
    SET token = EXCLUDED.token,
        expires_at = EXCLUDED.expires_at
`;

  return true;
};

