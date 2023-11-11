const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "turingospace.team@gmail.com",
    pass: "yrmm gbsc yvlf svxr",
  },
});

const sendConfirmationEmail = (to, confirmationLink) => {
  const mailOptions = {
    from: "turingospace.team@gmail.com",
    to,
    subject: "Confirma tu correo electronico",
    html: `<p>Gracias por registrarte. Por favor, haz clic en el siguiente enlace para confirmar tu correo electrónico:</p><a href="${confirmationLink}">Confirmar correo electrónico</a>`,
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

module.exports = { sendConfirmationEmail };
