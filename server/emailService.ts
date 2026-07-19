// Contact-form email via Resend (same provider as DailyQuoteBlaster).
//
// Env vars:
//   RESEND_API_KEY  - Resend API key
//   SENDER_EMAIL    - from address (onboarding@resend.dev for the test sender)
//   CONTACT_TO_EMAIL- where submissions are sent (defaults to the owner)
//
// The same public signature as before, so routes.ts is unchanged. If the key is
// missing, it throws; the caller already treats email failure as non-fatal (the
// message is still saved to the database).

import { Resend } from "resend";
import type { ContactMessage } from "@shared/schema";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactNotification(message: ContactMessage) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }

  const resend = new Resend(apiKey);
  const from = process.env.SENDER_EMAIL || "onboarding@resend.dev";
  const to = process.env.CONTACT_TO_EMAIL || "monideep2255@gmail.com";

  const name = escapeHtml(message.name);
  const email = escapeHtml(message.email);
  const body = escapeHtml(message.message);

  return resend.emails.send({
    from: `Portfolio Contact <${from}>`,
    to,
    replyTo: message.email,
    subject: `New contact form submission from ${message.name}`,
    html: `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${body}</p>
    `,
  });
}
