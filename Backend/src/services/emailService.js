import nodemailer from 'nodemailer';

// -----------------------------------------------------
// Configuración del transporte SMTP
// Se define el servidor SMTP que se usará para enviar los correos.
// Los valores se toman desde variables de entorno (.env), con valores por defecto compatibles con Gmail.
//


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
//  Función: enviarEmailRecuperacion
// Envía un correo electrónico con un enlace de recuperación de contraseña
//
// Parámetros:
// - toEmail: email del destinatario
// - recoveryLink: URL con el token de recuperación
//
// Retorna:
// - Nada explícitamente. Lanza error si el envío falla.
//

//arma el email: el remitente, el destinatario, asunto del correo y el cuerpo html
//que contiene el mensaje y el link para recuperar la contraseña


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


