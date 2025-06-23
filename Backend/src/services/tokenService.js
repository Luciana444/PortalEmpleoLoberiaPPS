import jwt from 'jsonwebtoken';

// clave secreta para firmar y verificar el token, tiempo de expiracion una hora
const JWT_SECRET = process.env.JWT_SECRET || 'mi_secreto_super_seguro';
const TOKEN_EXPIRATION = '1h';

//crea un token con el id del usuario y lo firma con la calve secreta
export const generarTokenRecuperacion = (userId) => {
  const payload = { id: userId };
  //devuelve el token JWT como string que se enviara en el link de recuperacion
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
};

//verifica la validez del token con la clave secreta y si no expiro
export const verificarTokenRecuperacion = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error };
  }
};
