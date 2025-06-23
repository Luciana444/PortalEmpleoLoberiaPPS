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

export const registrarse = async (req, res) => {
  try {
    //recibo los daots del body
    console.log('Body recibido:', req.body);
    const { nombre, email, contrasena, tipo_usuario } = req.body;

    //verifico que esten todos los campos
    if (!nombre || !email || !contrasena || !tipo_usuario) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    //controlo que sea un formato de email valido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    //controlo que manden uno de los 3 tipos de usuario permitidos
    const tiposValidos = ['ciudadano', 'empresa', 'admin'];
    if (!tiposValidos.includes(tipo_usuario)) {
      return res.status(400).json({ error: 'Tipo de usuario inválido' });
    }

    //creo al nuevo usuario en un objeto con todos los datos que precisa la tabla
    const nuevoUsuario = {
      nombre,
      email,
      password: contrasena,  
      tipo_usuario,
      fecha_registro: new Date().toISOString(),
      estado: true
    };

    //llamo a registrarUsuario del archivo usuarioService.js y le paso el nuevo usuario
    //que cree con datos validos
    const resultado = await registrarUsuario(nuevoUsuario);

    //separo la contraseña del objeto para no mandarla ya que es informacion snesible
    const { contraseña, ...usuarioSinPassword } = resultado;

    res.status(201).json(usuarioSinPassword);

  } catch (error) {
    //en caso de error muestro un mensaje en pantalla al usuario
    console.error(error);
    res.status(500).json({ error: error.message || 'Error interno' });
  }
};

import { getUserByEmail, enviarLinkRecuperacion } from '../services/usuarioService.js';

//agarro el email del body
export const enviarTokenRecuperacion = async (req, res) => {
  const { email } = req.body;

  //verifico que el campo email no este vacio
  if (!email) {
    return res.status(400).json({ error: 'El email es requerido' });
  }

  try {
    //llamo a una funcione del service para buscar al usuario por su email en la base de datos
    const usuario = await getUserByEmail(email);

    //verifico que el email exista en la base de datos
    if (!usuario) { 
      return res.status(404).json({ error: 'El email no está registrado' });
    }

    //llamo a una funcion del service para mandarle un correo al usuario que lo solicito
    await enviarLinkRecuperacion(email, usuario.id);

    //doy un mensaje claro para que el usuario vaya a revisar su correo
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