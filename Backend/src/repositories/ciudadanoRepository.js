import pool from '../configs/supabaseClient.js';

export const obtenerUsuarios = async () => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    return result.rows;  // Devuelve un array con los usuarios
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};
