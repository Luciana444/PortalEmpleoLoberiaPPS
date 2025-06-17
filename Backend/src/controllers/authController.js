import { getPersonaByEmail } from "./usuarioController.js";
import {registrarUsuario} from '../services/usuarioService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const iniciarSesion = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y password son requeridos' });
  }

  const usuario = await getPersonaByEmail(email);  

  if(!usuario){
    return res.status(404).json({error:'No existe el usuario'});
  }

  const coincidePassword = await bcrypt.compare(password,user.password);

  if(!coincidePassword){
    return res.json({message:'Credenciales incorrectas'});
  }


  const payload = {
    id: usuario.id,
    email: usuario.email,
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET,{
    expiresIn:'1h'
  })


  return res.json({message:'Se inicio la sesion correctamente', token})


};


//----------------------------------------------------------------------------

export const registrarse = async (req, res) => {
  try {
    const { nombre, password } = req.body;

    if (!nombre || !password) {
      return res.status(400).json({ error: 'Nombre y contraseña son obligatorios' });
    }

    const resultado = await registrarUsuario({ nombre, password });

    res.status(201).json(resultado);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Error interno' });
  }
};