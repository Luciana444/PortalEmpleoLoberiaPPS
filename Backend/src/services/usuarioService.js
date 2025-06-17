import { findAll, findPersonaByEmail } from "../repositories/usuarioRepository.js";


export const findAllPersonas = async () => {
    try {
        const usuarios = await findAll();
        console.log(usuarios);
    } catch (error) {
        console.error(error);
    }
};


export const getPersonaByEmail = async (email)=>{
    try {
        const persona = await findPersonaByEmail(email);
        console.log(persona)
    } catch (error) {
        console.log(error);
    }
}

//------------------------------------------------------------------
import {existeNombre, crearUsuario} from '../repositories/usuarioRepository.js';
import bcrypt from 'bcrypt';

export const registrarUsuario = async ({ nombre, password }) => {

  const existe = await existeNombre(nombre);
  if (existe) {
    throw new Error('El nombre ya está registrado');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const idUsuario = await crearUsuario({ nombre, hashedPassword });

  return { message: 'Usuario registrado correctamente', idUsuario };
};