import nodemailer from "nodemailer";
import type { ContactMessage } from "@shared/schema";

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD // This should be an app-specific password
  }
});

export async function sendContactNotification(message: ContactMessage) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'monideep2255@gmail.com',
    subject: `New Contact Form Submission from ${message.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${message.name}</p>
      <p><strong>Email:</strong> ${message.email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.message}</p>
    `
  };

  return transporter.sendMail(mailOptions);
}
