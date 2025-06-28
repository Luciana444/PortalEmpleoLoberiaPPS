import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mi_secreto_super_seguro';
const TOKEN_EXPIRATION = '1h';

// ================================
// Genera el token de recuperación
// ================================
export const generarTokenRecuperacion = (userId) => {
  const payload = { id: userId };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
};

// ================================
// Verifica si el token es válido
// ================================
export const verificarTokenRecuperacion = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error };
  }
};