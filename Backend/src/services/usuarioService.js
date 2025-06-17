import { findAll, findPersonaByEmail } from "../repositories/usuarioRepository.js";
import jwt from 'jsonwebtoken';

export const findAllPersonas = async () => {
    try {
        const usuarios = await findAll();
        console.log(usuarios);
    } catch (error) {
        console.error(error);
    }
};


//------------------------------------------------------------------
import {existeNombre, crearUsuario} from '../repositories/usuarioRepository.js';
import bcrypt from 'bcrypt';

export const registrarUsuario = async ({ nombre, email, password, tipo_usuario}) => {

  const existe = await existeNombre(nombre);
  if (existe) {
    throw new Error('El nombre ya está registrado');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const idUsuario = await crearUsuario({ nombre,email, hashedPassword,tipo_usuario });

  return { message: 'Usuario registrado correctamente', idUsuario };
};


export const iniciarSesionUsuario = async ({email,password})=>{

  const usuario = await findPersonaByEmail(email);
  if(!usuario){
    throw new Error('El usuario no existe');
  }
  const coincidePassword = await bcrypt.compare(password,usuario.contrasena);

  if(!coincidePassword){
      throw new Error('Credenciales incorrectas');
  }

  const payload = {
    id: usuario.id,
    email: usuario.email,
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET,{
    expiresIn:'1h'
  })

  return token;

}