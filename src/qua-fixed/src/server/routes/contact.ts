import express from 'express';
import { query } from '../db.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// Optional: persist contact messages to DB
async function saveContactMessage(name: string, email: string, message: string) {
  try {
    await query(
      `INSERT INTO contact_messages (name, email, message, created_at)
       VALUES ($1, $2, $3, NOW())`,
      [name, email, message]
    );
  } catch {
    // Table may not exist yet — fail silently, email still sends
  }
}

async function sendEmail(name: string, email: string, message: string) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return; // Skip if not configured

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT ?? '587'),
    secure: SMTP_PORT === '465',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"Qua Business Contact" <${SMTP_USER}>`,
    to: CONTACT_TO_EMAIL ?? SMTP_USER,
    replyTo: email,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
           <hr/>
           <p>${message.replace(/\n/g, '<br/>')}</p>`,
  });
}

/**
 * POST /api/contact
 * Public — no auth required
 */
router.post('/', async (req: any, res: any) => {
  const { name, email, message } = req.body ?? {};

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'name, email, and message are required' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }
  if (message.trim().length > 2000) {
    return res.status(400).json({ error: 'Message must be 2000 characters or fewer' });
  }

  try {
    await Promise.all([
      saveContactMessage(name.trim(), email.trim(), message.trim()),
      sendEmail(name.trim(), email.trim(), message.trim()),
    ]);
    res.json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('Contact route error:', err);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

export default router;
