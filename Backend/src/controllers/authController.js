// Controlador de autenticación de usuarios.
// Contiene funciones para registrar, iniciar y cerrar sesión, y recuperar contraseña.

import {registrarUsuario, iniciarSesionUsuario,cerrarSesionUsuario} from '../services/usuarioService.js';


import dotenv from 'dotenv';


dotenv.config();

//===============================================================
/**
 * Iniciar sesión
 * Procesa la petición POST /auth/login
 * Valida credenciales básicas y delega el inicio de sesión al service.
 */
//================================================================



export const iniciarSesion = async (req, res) => {
  try {
    const { email, contrasena } = req.body;
    // Validación de campos obligatorios

    if (!email || !contrasena) {
      return res.status(400).json({ error: 'El email y password son requeridos' });
    }
   // Llama al service para verificar credenciales
    const resultado = await iniciarSesionUsuario({email,contrasena});

    
    if(!resultado){
      return res.status(500).json({message:"No se pudo iniciar sesion"});
    }

   // Devuelve datos del usuario autenticado (y token si aplica)
  return res.json({message:'Se inicio la sesion correctamente', resultado})
  } catch (error) {
    // 💡 Acá capturamos los errores lanzados desde el service
    if (error.message === 'El usuario no existe' || error.message === 'Credenciales incorrectas') {
      return res.status(401).json({ error: error.message });
    }

    console.error('Error inesperado al iniciar sesión:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
  

//===============================================================
/**
 * Registro de usuario
 * Procesa la petición POST /auth/register
 * Valida los datos, crea un objeto de usuario y lo pasa al service.
 */
//===================================================================




export const registrarse = async (req, res) => {
  try {
    //recibe los datos del body
    console.log('Body recibido:', req.body);
    const { nombre, email, contrasena, tipo_usuario } = req.body;

    //verifica que esten todos los campos
    if (!nombre || !email || !contrasena || !tipo_usuario) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    //controla que sea un formato de email valido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    //controla que manden uno de los 3 tipos de usuario permitidos
    const tiposValidos = ['ciudadano', 'empresa', 'admin'];
    if (!tiposValidos.includes(tipo_usuario)) {
      return res.status(400).json({ error: 'Tipo de usuario inválido' });
    }

    //crea al nuevo usuario en un objeto con todos los datos que precisa la tabla
    const nuevoUsuario = {
      nombre,
      email,
      password: contrasena,  
      tipo_usuario,
      fecha_registro: new Date().toISOString(),
      estado: true
    };

    //llama a registrarUsuario del archivo usuarioService.js y le pasa el nuevo usuario
    //que  se creo con datos validos
    const resultado = await registrarUsuario(nuevoUsuario);

    //separa la contraseña del objeto para no mandarla ya que es informacion sensible
    const { contraseña, ...usuarioSinPassword } = resultado;

    res.status(201).json(usuarioSinPassword);

  } catch (error) {
    //en caso de error muestra un mensaje en pantalla al usuario
    console.error(error);
    res.status(500).json({ error: error.message || 'Error interno' });
  }
};



import { getUserByEmail, enviarLinkRecuperacion, actualizarContrasenaConToken } from '../services/usuarioService.js';

//======================================================================================
/**
 * Enviar token de recuperación de contraseña
 * Procesa POST /auth/recover/password
 * Verifica que el email exista y solicita al service enviar el link de recuperación.
 */
//====================================================================================

//Extrae el email del body
export const enviarTokenRecuperacion = async (req, res) => {
  const { email } = req.body;

  //verifica que el campo email no este vacio
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

// ===================
// Resetear contraseña usando el token
// ===================
export const resetearContrasena = async (req, res) => {
  const { token, nuevaContrasena } = req.body;

  if (!token || !nuevaContrasena) {
    return res.status(400).json({ error: 'Token y nueva contraseña requeridos' });
  }

  try {
    await actualizarContrasenaConToken(token, nuevaContrasena);
    res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error al resetear contraseña:', error);
    res.status(400).json({ error: error.message || 'Token inválido o expirado' });
  }
};


//====================================================================
/**
 * Cerrar sesión de usuario
 * Procesa POST /auth/logout
 * Requiere middleware de autenticación para extraer el usuario y el token.
 */
//====================================================================

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

