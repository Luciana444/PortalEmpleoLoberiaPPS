import {registrarUsuario, iniciarSesionUsuario} from '../services/usuarioService.js';
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
    const { nombre, email, password, tipo_usuario } = req.body;

    if (!nombre || !password) {
      return res.status(400).json({ error: 'Nombre y contraseña son obligatorios' });
    }

    const resultado = await registrarUsuario({ nombre, email, password, tipo_usuario});

    res.status(201).json(resultado);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Error interno' });
  }
};