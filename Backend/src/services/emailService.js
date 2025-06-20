import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false, // true si usás puerto 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

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

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email de recuperación enviado a:', toEmail);
  } catch (error) {
    console.error('Error enviando email:', error);
    throw error;
  }
};
