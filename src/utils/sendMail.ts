import nodemailer from "nodemailer";
const sendMail = async (to:string,subject:string,html:string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "virat18sarkar@gmail.com",
      pass: "qaga odka vmbi xgzr",
    },
  });

  await transporter.sendMail({
    from: "Tour and travels", // sender address
    to, // list of receivers
    subject, // Subject line
    text: "Hello world?", // plain text body
    html, // html body
  });
};

export default sendMail;
