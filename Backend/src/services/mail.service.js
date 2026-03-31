import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html, text }) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Memora <onboarding@resend.dev>",
      to,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("Email send error: ", error);
      throw new Error(error.message);
    }

    console.log("Email sent:", data);
    return data;
  } catch (err) {
    console.error("Failed to send email: ", err.message);
    throw err;
  }
}
