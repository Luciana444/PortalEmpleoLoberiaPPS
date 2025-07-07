import nodemailer from 'nodemailer';

// -----------------------------------------------------
// Configuración del transporte SMTP
// Se define el servidor SMTP que se usará para enviar los correos.
// Los valores se toman desde variables de entorno (.env), con valores por defecto compatibles con Gmail.
//

/**
 * Configuración del transporte de correo electrónico mediante Nodemailer.
 *
 * Este objeto define cómo se enviarán los correos electrónicos salientes del sistema,
 * utilizando un servidor SMTP autenticado.
 *
 * - Por defecto se utiliza Gmail (`smtp.gmail.com`), pero puede adaptarse a otro servidor.
 * - Usa TLS (STARTTLS) en el puerto 587.
 * - Las credenciales y parámetros se leen desde las variables de entorno:
 *   - `SMTP_HOST`
 *   - `SMTP_PORT`
 *   - `SMTP_USER`
 *   - `SMTP_PASS`
 *
 * @constant
 * @type {Object}

 */

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',// Servidor SMTP
  port: process.env.SMTP_PORT || 587, // Puerto (587 para TLS)
  secure: false,                       // false para TLS (STARTTLS)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


// -----------------------------------------------------

/**
 * Envía un correo electrónico con un enlace de recuperación de contraseña.
 *
 * Esta función utiliza el servicio de correo configurado con Nodemailer para
 * enviar un email personalizado al usuario que solicitó recuperar su contraseña.
 *
 * @async
 * @function
 * @param {string} toEmail - Dirección de correo electrónico del destinatario.
 * @param {string} recoveryLink - Enlace único de recuperación que permitirá al usuario restablecer su contraseña.
 * @throws {Error} Si ocurre un error al enviar el correo.
 * 
 * @example
 * await enviarEmailRecuperacion('usuario@example.com', 'https://miapp.com/reset?token=abc123');
 */


export const enviarEmailRecuperacion = async (toEmail, recoveryLink) => {
  const mailOptions = {
    from: `"Portal Empleos" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: 'Recuperación de contraseña',
    html: `
      <p>Hola,</p>
      <p>Para recuperar tu contraseña, hacé click en el siguiente enlace:</p>
      <a href="${recoveryLink}">${recoveryLink}</a>
      <p>Si no solicitaste este correo, podés ignorarlo.</p>
    `,
  };

  //envia el email al usuario y manejo de errores si falla
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email de recuperación enviado a:', toEmail);
  } catch (error) {
    console.error('Error enviando email:', error);
    throw error;
  }
};


//==============================================