const nodemailer = require("nodemailer");
const crypto = require('crypto');

const claveSecreta = 'mi-claver-secreta-cypher';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "turingospace.team@gmail.com",
    pass: "yrmm gbsc yvlf svxr",
  },
});

const sendConfirmationEmail = (to, confirmationLink, token) => {

  const cipher = crypto.createCipher('aes-256-cbc', claveSecreta);
  let tokenCifrado = cipher.update(token, 'utf-8', 'hex');
  tokenCifrado += cipher.final('hex');

  const mailOptions = {
    from: "turingospace.team@gmail.com",
    to,
    subject: "Confirma tu correo electronico",
    html: `<p>Gracias por registrarte. Por favor, haz clic en el siguiente enlace para confirmar tu correo electrónico:</p><a href="${confirmationLink}?temporary=${tokenCifrado}">Click para verficiar email</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log(
        "Correo electronico de confirmacion enviado: " + info.response
      );
    }
  });
};

const sendRecoverPassword = (to, token) => {
  const confirmationLink = `${process.env.PORT_CLIENT}/client/forgot-password-clients-ts`;
  const mailOptions = {
    from: "turingospace.team@gmail.com",
    to,
    subject: "Recuperado de contraseña",
    html: `<p>Puedes utilizar este enlace para recuperar tu contraseña:</p><a href="${confirmationLink}?access_token=${token}">Click para verficiar email</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log(
        "Correo electronico de confirmacion enviado: " + info.response
      );
    }
  });
};


module.exports = { sendConfirmationEmail, sendRecoverPassword  };
