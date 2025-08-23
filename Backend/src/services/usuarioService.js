
//  Importación de funciones desde los repositorios

import {existeEmail, crearUsuario, findUserById, borrarCuentaByIdUsuario} from '../repositories/usuarioRepository.js';
import {findAll, findUserByEmail, actualizarContrasena,registrarVisitaRepository} from '../repositories/usuarioRepository.js';


//Librerías para manejo de seguridad
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';// Carga las variables del archivo .env


//  Servicios auxiliares para envío de email y generación de token de recuperación
import { generarTokenRecuperacion,verificarTokenRecuperacion} from './tokenService.js';
import { enviarEmailRecuperacion } from './emailService.js';
dotenv.config();



//-----------------------------------------------------
// Servicio: Obtener todos los usuarios registrados
//-----------------------------------------------------
/**
 * Obtiene todos los usuarios/personas registrados en la base de datos.
 *
 * Realiza una consulta a la base de datos para obtener la lista completa de usuarios.
 *
 * @async
 * @function
 * @returns {Promise<Array>} Arreglo con objetos de usuarios.
 * @throws {Error} Propaga cualquier error que ocurra durante la consulta a la base de datos.
 *
 * @example
 * try {
 *   const usuarios = await findAllPersonas();
 *   console.log(usuarios);
 * } catch (error) {
 *   console.error('Error al obtener usuarios:', error);
 * }
 */

export const findAllPersonas = async () => {
    try {
        const usuarios = await findAll();// Consulta a la base de datos
        return usuarios;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

//===========================================================
//get usuarios por id
//=========================================================
/**
 * Obtiene un usuario por su ID.
 *
 * Realiza una búsqueda en la base de datos para encontrar un usuario con el identificador proporcionado.
 *
 * @async
 * @function
 * @param {string} id - Identificador único del usuario (UUID).
 * @returns {Promise<Object|null>} Objeto usuario si se encuentra, o null si no existe.
 * @throws {Error} Propaga cualquier error ocurrido durante la búsqueda.
 *
 * @example
 * try {
 *   const usuario = await getUserById('uuid-del-usuario');
 *   console.log(usuario);
 * } catch (error) {
 *   console.error('Error al obtener usuario:', error);
 * }
 */

export const getUserById = async (id)=>{
  try {
    const usuario = findUserById(id);
    return usuario;
  } catch (error) {
    console.log(error);
  }
};


//-----------------------------------------------------
// Servicio: Iniciar sesión de usuario
//-----------------------------------------------------
/**
 * Verifica las credenciales del usuario e inicia sesión.
 *
 * Busca un usuario por email, valida la contraseña comparándola con el hash almacenado,
 * y si es correcto genera un token JWT para autenticación.
 *
 * @async
 * @function
 * @param {Object} param0
 * @param {string} param0.email - Email del usuario.
 * @param {string} param0.contrasena - Contraseña en texto plano para verificar.
 * @throws {Error} Cuando el usuario no existe o las credenciales son incorrectas.
 * @returns {Promise<Object>} Objeto con información del usuario (`payload`) y token JWT (`token`).
 *
 * @example
 * try {
 *   const { payload, token } = await iniciarSesionUsuario({ email: 'user@example.com', contrasena: '1234' });
 *   console.log('Token JWT:', token);
 * } catch (error) {
 *   console.error(error.message);
 * }
 */


export const iniciarSesionUsuario = async ({ email, contrasena }) => {
  const usuario = await findUserByEmail(email); //busca el usuario en la base de datos
  if (!usuario) {
    throw new Error('El usuario no existe');
  }

  const coincidePassword = await bcrypt.compare(contrasena, usuario.contrasena);// Compara con hash guardado

  if (!coincidePassword) {
    throw new Error('Credenciales incorrectas');
  }
 // Info que irá dentro del token JWT
  const payload = {
    id: usuario.id,
    email: usuario.email,
    tipo_usuario: usuario.tipo_usuario
  };

  // Genera el token JWT con clave secreta y expiración
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  return { payload, token };
};


//-----------------------------------------------------
// Servicio: Registrar nuevo usuario
//-----------------------------------------------------
/**
 * Registra un nuevo usuario en la base de datos.
 *
 * Verifica que el email no esté ya registrado; si existe lanza un error.
 * En caso contrario, crea el usuario con los datos proporcionados.
 *
 * @async
 * @function
 * @param {Object} param0
 * @param {string} param0.nombre - Nombre completo del usuario.
 * @param {string} param0.email - Email único para el usuario.
 * @param {string} param0.password - Contraseña en texto plano que será hasheada.
 * @param {string} param0.tipo_usuario - Tipo de usuario (por ejemplo, "ciudadano" o "empresa").
 * @throws {Error} Cuando el email ya está registrado.
 * @returns {Promise<void>} No retorna valor, solo inserta el usuario.
 */


export const registrarUsuario = async ({ nombre, email, password, tipo_usuario }) => {
  //verifico que el email no este registrado en la base de datos
  const existe = await existeEmail(email);
  if (existe) {

    throw new Error('El email ya está registrado');


    
  }

  //encripto la contraseña usando bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  //llamo a una funcion del usuarioRepository.js que guarda al usuario en la base de datos
  const usuarioGuardado = await crearUsuario({
    nombre,
    email,
    contrasena: hashedPassword,
    tipo_usuario,
    fecha_registro: new Date().toISOString(),
    estado: true
  });

  //devuelvo un mensaje de registro exitoso al usuario
  return {
    message: 'Usuario registrado correctamente',
    idUsuario: usuarioGuardado.id
  };

};


//-----------------------------------------------------
// Servicio: Obtener usuario por email
//-----------------------------------------------------
/**
 * Obtiene un usuario por su email.
 *
 * @async
 * @function
 * @param {string} email - Correo electrónico del usuario a buscar.
 * @returns {Promise<Object|null>} Devuelve el usuario encontrado o null si no existe.
 */

export const getUserByEmail = async (email) => {
  return await findUserByEmail(email);
};


//-----------------------------------------------------
//  Servicio: Guardar token de recuperación
//-----------------------------------------------------

/**
 * Envía un link de recuperación de contraseña al email indicado.
 *
 * @async
 * @function
 * @param {string} email - Correo electrónico del usuario que solicitó recuperación.
 * @param {string} userId - ID del usuario para generar el token de recuperación.
 * @returns {Promise<void>} No devuelve valor, lanza error si falla el envío.
 */

export const enviarLinkRecuperacion = async (email, userId) => {
  const token = generarTokenRecuperacion(userId);
  /* Esto debería estar parametrizado - Hugo */
  const linkRecuperacion = `https://empleo.loberia.gob.ar/reset?token=${token}`;
  await enviarEmailRecuperacion(email, linkRecuperacion);
};


//===========================================================
//actualizar contraseña
//=========================================================
/**
 * Actualiza la contraseña de un usuario validando primero el token de recuperación.
 *
 * @function
 * @async
 * @param {string} token - Token de recuperación enviado al email del usuario.
 * @param {string} nuevaContrasena - Nueva contraseña en texto plano.
 * @throws {Error} Lanza error si el token no es válido o está expirado.
 * @returns {Promise<void>} No retorna valor, actualiza la contraseña en la base de datos.
 */


export const actualizarContrasenaConToken = async (token, nuevaContrasena) => {
  const { valid, decoded, error } = verificarTokenRecuperacion(token);

  if (!valid) throw new Error('Token inválido o expirado');

  const hashed = await bcrypt.hash(nuevaContrasena, 10);
  await actualizarContrasena(decoded.id, hashed);
};


//================================================================
// Actualizar foto de perfil
//=============================================================
/**
 * Guarda la foto de perfil para un usuario y actualiza su ruta en la base de datos.
 *
 * @async
 * @function
 * @param {string} userId - ID del usuario al que se le asigna la foto.
 * @param {object} file - Archivo de imagen recibido (objeto de Multer).
 * @param {string} tipoUsuario - Tipo de usuario (ej. 'ciudadano', 'empresa').
 * @returns {Promise<string>} Ruta relativa donde se guardó la foto.
 * @throws {Error} Si no se recibe archivo.
 */


import path from 'path';
import { actualizarFotoPerfil } from '../repositories/usuarioRepository.js';

export const guardarFotoPerfil = async (userId, file, tipoUsuario) => {
  if (!file) {
    throw new Error('No se recibió archivo');
  }

  const rutaRelativa = path.join('/foto', file.filename).replace(/\\/g, '/');

  await actualizarFotoPerfil(userId, rutaRelativa, tipoUsuario);

  return rutaRelativa;
};

//=====================================================================



export const borrarCuenta = async(id_usuario)=>{
  await borrarCuentaByIdUsuario(id_usuario);
}


export const registrarVisitaService = async (visitaData) => {
  await registrarVisitaRepository(visitaData);
};
