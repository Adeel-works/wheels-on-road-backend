const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'martin17@ethereal.email',
    pass: 'h9JU5UC9spyPWqrsS6'
  }
});

export const sendMail = async ({email,password}) => {
    console.log({email});
    const info = await transporter.sendMail({
        from: 'techgeek027@gmail.com', // sender address
        to:email, // list of receivers
        subject: "Welcome to wheelsOnRoad.com", // Subject line
        text: `Your password is: ${password}`, // plain text body
        html: "<b>Hello world?</b>", // html body
    });
    console.log({info});
    console.log("Message sent: %s", info.messageId);

    
}
