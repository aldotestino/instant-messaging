import { Router } from 'express';
import { register, login, activateAccount, update, updatePassword } from '../db/users';
import nodemailer from 'nodemailer';
import User from '../types/User';

const userRoute = Router();

userRoute.post('/login', async (req, res, next) => {
  try {
    const { username, password }: { username: string, password: string } = req.body;
    if (!username || !password) {
      const e = new Error('Il campo "username" o "password" non sono definiti');
      next(e);
    }
    const user = await login(username, password);
    res.status(200);
    res.json({
      _id: user._id,
      token: user.token,
      username: user.username,
      photoUrl: user.photoUrl
    });
  } catch (e) {
    next(e);
  }
});

userRoute.get('/activate/:token', async (req, res, next) => {
  try {
    const { token } = req.params;
    const confirmed = await activateAccount(token);

    const client_url = process.env.CLIENT_URL || 'http://localhost:3000';

    if (confirmed) {
      res.redirect(`${client_url}/login`);
    }
  } catch (e) {
    next(e);
  }
});

userRoute.post('/register', async (req, res, next) => {
  try {
    const newUser: User = req.body;
    const user = await register(newUser);

    const server_url = process.env.SERVER_URL || 'http://localhost:3001';

    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: 'Instant Messaging',
      to: user.email,
      subject: 'Conferma il tuo account',
      html: `
<h1>Benvenuto in Instant Messaging</h1>
<p>Conferma il tuo account andando su questo <a href="${server_url}/api/v1/user/activate/${user.token}">link</a>`,
    });

    res.status(201)
    res.json({
      message: `E' stata inviata una mail al tuo indirizzo: ${user.email}, per la conferma del tuo account!`
    });
  } catch (e) {
    next(e);
  }
});

userRoute.patch('/update', async (req, res, next) => {
  try {
    const { token } = req.headers;
    const { newUsername, newPhotoUrl }: { newUsername: string, newPhotoUrl: string } = req.body;
    if (!newUsername) {
      throw new Error('Il campo "username" non è definito');
    }
    const updatedUser = await update(token as string, newUsername, newPhotoUrl);
    res.status(200);
    res.json({
      _id: updatedUser._id,
      token: updatedUser.token,
      username: updatedUser.username,
      photoUrl: updatedUser.photoUrl
    });
  } catch (e) {
    next(e);
  }
});

userRoute.patch('/update/password', async (req, res, next) => {
  try {
    const { token } = req.headers;
    const { password, newPassword }: { password: string, newPassword: string } = req.body;
    if (!password || !newPassword) {
      throw new Error('Il campo "passowrd" o "nuova password" non è definito');
    }
    const response = await updatePassword(token as string, password, newPassword);
    res.status(200);
    res.json(response);
  } catch (e) {
    next(e);
  }
});

export default userRoute;