import {registrarUsuario, iniciarSesionUsuario,cerrarSesionUsuario} from '../services/usuarioService.js';


import dotenv from 'dotenv';


dotenv.config();

export const iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'El email y password son requeridos' });
    }

    const resultado = await iniciarSesionUsuario({email,password});

    if(!resultado){
      return res.status(500).json({message:"No se pudo iniciar sesion"});
    }


  return res.json({message:'Se inicio la sesion correctamente', resultado})
  } catch (error) {
      console.log(error);
  }
  


};


//----------------------------------------------------------------------------

export const registrarse = async (req, res) => {
  try {
    console.log('Body recibido:', req.body);
    const { nombre, email, contrasena, tipo_usuario } = req.body;

    if (!nombre || !email || !contrasena || !tipo_usuario) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    const tiposValidos = ['ciudadano', 'empresa'];
    if (!tiposValidos.includes(tipo_usuario)) {
      return res.status(400).json({ error: 'Tipo de usuario inválido' });
    }

    const nuevoUsuario = {
      nombre,
      email,
      password: contrasena,  // aquí mapeo contrasena a password para el siguiente paso
      tipo_usuario,
      fecha_registro: new Date().toISOString(),
      estado: true
    };

    const resultado = await registrarUsuario(nuevoUsuario);

    const { contraseña, ...usuarioSinPassword } = resultado;

    res.status(201).json(usuarioSinPassword);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Error interno' });
  }
};

import { getUserByEmail, enviarLinkRecuperacion } from '../services/usuarioService.js';

export const enviarTokenRecuperacion = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'El email es requerido' });
  }

  try {
    const usuario = await getUserByEmail(email);

    if (!usuario) { 
      return res.status(404).json({ error: 'El email no está registrado' });
    }

    await enviarLinkRecuperacion(email, usuario.id);

    res.status(200).json({ message: 'Se envió un link para recuperar la contraseña' });
  } catch (error) {
    console.error('Error en recuperación de contraseña:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};



export const cerrarSesion = async (req,res)=>{
  try {
      const id_usuario = req.usuario.id;
      const token = req.token;
      if(!token){
        return res.status(400).json({mensaje: 'Falta el token, error'});
      }
      await cerrarSesionUsuario(id_usuario,token);
      return res.json({mensaje:'Sesion cerrada correctamente'})

  } catch (error) {
      console.log(error);
      return res.status(500).json({mensaje:'Error al cerrar sesion'})
  }
}