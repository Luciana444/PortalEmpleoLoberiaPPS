
//  Importación de funciones desde los repositorios

import {existeEmail, crearUsuario} from '../repositories/usuarioRepository.js';
import {findAll, findUserByEmail, actualizarContrasena} from '../repositories/usuarioRepository.js';


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

export const findAllPersonas = async () => {
    try {
        const usuarios = await findAll();// Consulta a la base de datos
        return usuarios;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

//-----------------------------------------------------
// Servicio: Iniciar sesión de usuario
//-----------------------------------------------------


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

  return { token };
};


//-----------------------------------------------------
// Servicio: Registrar nuevo usuario
//-----------------------------------------------------


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

//funcion llamada por el controller que llama al repository para buscar al usuario por su email
export const getUserByEmail = async (email) => {
  return await findUserByEmail(email);
};


//-----------------------------------------------------
//  Servicio: Guardar token de recuperación
//-----------------------------------------------------

export const enviarLinkRecuperacion = async (email, userId) => {
  const token = generarTokenRecuperacion(userId);
  const linkRecuperacion = `http://localhost:3000/reset-password?token=${token}`;
  await enviarEmailRecuperacion(email, linkRecuperacion);
};

export const actualizarContrasenaConToken = async (token, nuevaContrasena) => {
  const { valid, decoded, error } = verificarTokenRecuperacion(token);

  if (!valid) throw new Error('Token inválido o expirado');

  const hashed = await bcrypt.hash(nuevaContrasena, 10);
  await actualizarContrasena(decoded.id, hashed);
};

import { supabase } from '../config/supabaseClient.js';
import { actualizarFotoPerfil } from '../repositories/usuarioRepository.js';

export const guardarFotoPerfil = async (userId, file) => {
  const nombreArchivo = `perfil_${userId}_${Date.now()}`;

  // Subimos el archivo
  const { data, error } = await supabase
    .storage
    .from('fotos-perfil')
    .upload(nombreArchivo, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (error) {
    console.error('Error subiendo archivo a Supabase:', error);
    throw error;
  }

  // Obtenemos URL pública
  const { data: urlData } = supabase
    .storage
    .from('fotos-perfil')
    .getPublicUrl(nombreArchivo);

  const publicUrl = urlData.publicUrl;

  if (!publicUrl) {
    throw new Error('No se pudo obtener la URL pública del archivo');
  }

  // Guardamos URL en DB
  await actualizarFotoPerfil(userId, publicUrl);

  return publicUrl;
};




