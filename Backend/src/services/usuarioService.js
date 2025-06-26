
//  Importación de funciones desde los repositorios

import {existeEmail, crearUsuario} from '../repositories/usuarioRepository.js';
import {findAll, findUserByEmail, savePasswordResetToken,invalidarToken } from '../repositories/usuarioRepository.js';


//Librerías para manejo de seguridad
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';// Carga las variables del archivo .env


//  Servicios auxiliares para envío de email y generación de token de recuperación
import { generarTokenRecuperacion } from './tokenService.js';
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

//recibo el id del usuario que quiere recuperar su contraseña y un token generado para ese usuario
export const guardarTokenRecuperacion = async (userId, token) => {
  //llamo a una funcion del repository para que guarde el token en la base de datos asociado a ese usuario
  return await savePasswordResetToken(userId, token);
};


//-----------------------------------------------------
//  Servicio: Enviar link de recuperación por email
//-----------------------------------------------------

export const enviarLinkRecuperacion = async (email, userId) => {
  //genera un token unico para recuperacion basado en el id del usuario
  const token = generarTokenRecuperacion(userId);
  //guarda ese token para validarlo cuando el usuario ingrese al link
  await guardarTokenRecuperacion(userId, token);
  //construye un link que lo redirige al un formulario para poner su nueva contraseña
  const linkRecuperacion = `http://localhost:3000/api/recover/password?token=${token}`;
  //envia el email de recuperacion donde se incluye el link de recuperacion
  await enviarEmailRecuperacion(email, linkRecuperacion);
};

//-----------------------------------------------------
// Servicio: Cerrar sesión de usuario (invalidar token)
//-----------------------------------------------------


export const cerrarSesionUsuario = async(id_usuario,token)=>{
    const resultado = await invalidarToken(id_usuario,token);
    return resultado;
}


