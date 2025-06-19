import {existeEmail, crearUsuario} from '../repositories/usuarioRepository.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import {findAll, findUserByEmail, savePasswordResetToken } from '../repositories/usuarioRepository.js';
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

export const registrarUsuario = async ({ nombre, email, password, tipo_usuario }) => {
  const existe = await existeEmail(email);
  if (existe) {
    throw new Error('El email ya está registrado');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const usuarioGuardado = await crearUsuario({
    nombre,
    email,
    contrasena: hashedPassword,
    tipo_usuario,
    fecha_registro: new Date().toISOString(),
    estado: true
  });

  return {
    message: 'Usuario registrado correctamente',
    idUsuario: usuarioGuardado.id
  };
};



export const getUserByEmail = async (email) => {
  return await findUserByEmail(email);
};

export const guardarTokenRecuperacion = async (userId, token) => {
  return await savePasswordResetToken(userId, token);
};

export const enviarLinkRecuperacion = async (email, userId) => {
  const token = generarTokenRecuperacion(userId);
  await guardarTokenRecuperacion(userId, token);
  const linkRecuperacion = `http://tusitio.com/reset-password?token=${token}`;
  await enviarEmailRecuperacion(email, linkRecuperacion);
};
