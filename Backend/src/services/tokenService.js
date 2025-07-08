import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mi_secreto_super_seguro';
const TOKEN_EXPIRATION = '1h';

// ================================
// Genera el token de recuperación
// ================================
/**
 * Genera un token JWT para la recuperación de contraseña.
 *
 * El token contiene el ID del usuario y tiene un tiempo de expiración configurado.
 *
 * @function
 * @param {string} userId - Identificador único del usuario.
 * @returns {string} Token JWT firmado que puede ser usado para verificar la autenticidad y vigencia de la solicitud de recuperación.
 *
 * @example
 * const token = generarTokenRecuperacion('123e4567-e89b-12d3-a456-426614174000');
 */

export const generarTokenRecuperacion = (userId) => {
  const payload = { id: userId };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
};

// ================================
// Verifica si el token es válido
// ================================
/**
 * Verifica y decodifica un token JWT para recuperación de contraseña.
 *
 * Intenta validar el token con la clave secreta. 
 * Devuelve un objeto indicando si es válido, junto con el payload decodificado o el error ocurrido.
 *
 * @function
 * @param {string} token - Token JWT a verificar.
 * @returns {Object} Resultado de la verificación:
 *                   - valid {boolean}: indica si el token es válido.
 *                   - decoded {Object}: payload decodificado si es válido.
 *                   - error {Error}: error ocurrido si el token no es válido.
 *
 * @example
 * const { valid, decoded } = verificarTokenRecuperacion(token);
 * if (valid) {
 *   console.log(decoded.id);
 * } else {
 *   console.error('Token inválido o expirado');
 * }
 */

export const verificarTokenRecuperacion = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error };
  }
};

//======================================