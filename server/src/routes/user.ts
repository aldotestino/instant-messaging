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
      token: user._id,
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
    if (confirmed) {
      res.redirect('https://instant-messaging.vercel.app/login');
    }
  } catch (e) {
    next(e);
  }
});

userRoute.post('/register', async (req, res, next) => {
  try {
    const newUser: User = req.body;
    const user = await register(newUser);

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
<p>Conferma il tuo account andando su questo <a href="https://server-instant-messaging.herokuapp.com/api/v1/user/activate/${user._id}">link</a>`,
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
    const { newUsername, newPhotoUrl } = req.body;
    const updatedUser = await update(token as string, newUsername, newPhotoUrl);
    res.status(200);
    res.json({
      token: updatedUser._id,
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
    const { password, newPassword } = req.body;
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