// Importa la librería jsonwebtoken para crear y verificar tokens JWT
import jwt from 'jsonwebtoken';


// clave secreta para firmar y verificar el token, tiempo de expiracion una hora
const JWT_SECRET = process.env.JWT_SECRET || 'mi_secreto_super_seguro';
const TOKEN_EXPIRATION = '1h';

// -----------------------------------------------------
// Función: generarTokenRecuperacion
// Crea un token JWT firmado que contiene el ID del usuario.
// Este token se usa para enviar en el link de recuperación de contraseña.
//
// Parámetros:
// - userId: ID del usuario para incluir en el payload del token.
//
// Retorna:
// - Un string con el token JWT firmado y con expiración.
//


export const generarTokenRecuperacion = (userId) => {
  const payload = { id: userId };
  //devuelve el token JWT como string que se enviara en el link de recuperacion
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
};


// -----------------------------------------------------
// Función: verificarTokenRecuperacion
// Verifica si un token JWT recibido es válido y no expiró.
//
// Parámetros:
// - token: string con el token JWT a validar.
//
// Retorna:
// - Un objeto con:
//    - valid: boolean que indica si el token es válido
//    - decoded: payload decodificado si es válido
//    - error: objeto error si el token es inválido o expirado
//


export const verificarTokenRecuperacion = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error };
  }
};


