import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { createTransport, TransportOptions } from 'nodemailer';
import { google } from 'googleapis';
import { SERVER_URI } from './config';

export function getUserId(req: Request): string | null {
  if(!req.headers.authorization || req.headers.authorization === '') {
    return null;
  }
  const { JWT_SECRET } = process.env;
  return String(jwt.verify(req.headers.authorization, JWT_SECRET!));
}

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
);
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});
const accessToken = oauth2Client.getAccessToken();

const transporterOptions = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  service: 'Gmail',
  tls: {
    rejectUnauthorized: false
  },
  auth: {
    type: 'OAUTH2',
    user: process.env.EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: accessToken,
  }
} as TransportOptions;

const transporter = createTransport(transporterOptions);

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
