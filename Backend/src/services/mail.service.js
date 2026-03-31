import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

transporter
  .verify()
  .then(() => {
    console.log("Email transporter is ready to send emails");
  })
  .catch((err) => {
    console.error("Email transporter verification failed:", err);
  });

export async function sendNodeEmail({ to, subject, html, text }) {
  const mailOptions = {
    from: `Memora <${process.env.BREVO_SMTP_USER}>`,
    to,
    subject,
    html,
    text,
  };

  const details = await transporter.sendMail(mailOptions); 
  return details;
}

export default transporter;
