const createMailer = function (nodemailer) {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_PWDSENDER,createMailer,
      pass: process.env.PASSWORD_MAIL
    }
  });

  return {
    sendMail: async function (mail, userPwd) {

      const mailOptions = {
        from: process.env.MAIL_PWDSENDER,
        to: mail,
        subject: 'Registrazione Poker-One',
        text: `Benvenuto nel miglior sito di poker dell'anno!\nEcco la password del tuo account mi raccomando non perderla!\nPassword: '${userPwd}'`
      };

      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log(info.response);
        }
      });
    }
  }
}
module.exports = createMailer;
