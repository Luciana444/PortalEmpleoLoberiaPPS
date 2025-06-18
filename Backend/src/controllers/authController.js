import {registrarUsuario, iniciarSesionUsuario} from '../services/usuarioService.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

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
    const { nombre, email, password, tipo_usuario } = req.body;

    if (!nombre || !email || !password || !tipo_usuario) {
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
      password,  
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