import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { createTransport } from 'nodemailer';
import { SERVER_URI } from './config';

export function getUserId(req: Request): string | null {
  if(!req.headers.authorization || req.headers.authorization === '') {
    return null;
  }
  const { JWT_SECRET } = process.env;
  return String(jwt.verify(req.headers.authorization, JWT_SECRET!));
}

const transporter = createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

interface SendEmailProps {
  email: string,
  id: string
}

export async function sendEmail({ email, id }: SendEmailProps): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: 'Instant Messaging',
      to: email,
      subject: 'Conferma il tuo account',
      html: `
  <h1>Benvenuto in Instant Messaging</h1>
  <p>Conferma il tuo account andando su questo <a href="${SERVER_URI}/authenticate/${id}">link</a>`
    });
    return true;
  }catch(e) {
    console.log(e);
    return false;
  }
}