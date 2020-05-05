const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '587',
    secure: false,
    auth: {
        user:'teste@gmail.com',
        pass: 'suasenha'
    }
});

transporter.sendMail({
    from: 'Moisez Dantas <moises1695@gmail.com>',
    to: 'moises1695@gmail.com',
    subject: "Oi, sou Moisez Dantas",
    text: 'Olá sou nodemail',
    html: 'Olá sou nodemail'
}).then(message => {
    console.log(message)
}).catch(erro =>{
    console.log(erro);
});