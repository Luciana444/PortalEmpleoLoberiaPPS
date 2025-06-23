import {existeEmail, crearUsuario} from '../repositories/usuarioRepository.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import {findAll, findUserByEmail, savePasswordResetToken,invalidarToken } from '../repositories/usuarioRepository.js';
import { generarTokenRecuperacion } from './tokenService.js';
import { enviarEmailRecuperacion } from './emailService.js';
dotenv.config();

export const findAllPersonas = async () => {
    try {
        const usuarios = await findAll();
        console.log(usuarios);
    } catch (error) {
        console.error(error);
    }
};

export const iniciarSesionUsuario = async ({ email, password }) => {
  const usuario = await findUserByEmail(email);
  if (!usuario) {
    throw new Error('El usuario no existe');
  }

  const coincidePassword = await bcrypt.compare(password, usuario.contrasena);

  if (!coincidePassword) {
    throw new Error('Credenciales incorrectas');
  }

  const payload = {
    id: usuario.id,
    email: usuario.email,
    tipo_usuario: usuario.tipo_usuario
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  return { token };
};

//recibo los datos del nuevo usuario
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

//funcion llamada por el controller que llama al repository para buscar al usuario por su email
export const getUserByEmail = async (email) => {
  return await findUserByEmail(email);
};

//recibo el id del usuario que quiere recuperar su contraseña y un token generado para ese usuario
export const guardarTokenRecuperacion = async (userId, token) => {
  //llamo a una funcion del repository para que guarde el token en la base de datos asociado a ese usuario
  return await savePasswordResetToken(userId, token);
};

//envia un link al email del usuario
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


export const cerrarSesionUsuario = async(id_usuario,token)=>{
    const resultado = await invalidarToken(id_usuario,token);
    return resultado;
}


