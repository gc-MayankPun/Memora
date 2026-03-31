import { createRequire } from "module";
const require = createRequire(import.meta.url);
const SibApiV3Sdk = require("@getbrevo/brevo");

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.authentications["apiKey"].apiKey = process.env.BREVO_API_KEY;

export async function sendEmail({ to, subject, html, text }) {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.sender = { name: "Memora", email: process.env.BREVO_SMTP_USER };
  sendSmtpEmail.to = [{ email: to }];
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = html;

  const details = await apiInstance.sendTransacEmail(sendSmtpEmail);
  console.log("Email sent:", details);
  return details;
}
