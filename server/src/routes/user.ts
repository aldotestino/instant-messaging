import { Router } from "express";
import { register, login } from "../db/users";
import User from "../types/User";

const userRoute = Router();

userRoute.post('/login', async (req, res, next) => {
  const { username, password }: { username: string, password: string } = req.body;
  if (!username || !password) {
    const e = new Error('Field "username" or "password" is undefined');
    next(e);
  }
  try {
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

userRoute.post('/register', async (req, res, next) => {
  const newUser: User = req.body;
  try {
    const user = await register(newUser);
    res.status(201)
    res.json({
      token: user._id,
      username: user.username,
      photoUrl: user.photoUrl
    });
  } catch (e) {
    next(e);
  }
});

export default userRoute;