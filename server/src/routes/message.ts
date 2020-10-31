import { Router } from "express";
import Message from "../types/Message";
import { addMessage, getMessages } from "../db/messages";
import { validateToken } from "../db/users";
import { io } from "../index";

const messageRoute = Router();

messageRoute.get('/', async (req, res, next) => {
  try {
    const { token } = req.headers;
    const can_user_read = await validateToken(token as string);
    if (!can_user_read) {
      throw new Error('Invalid token');
    }
    const messages = await getMessages();
    res.status(200);
    res.json(messages);
  } catch (e) {
    next(e);
  }
});

messageRoute.post('/', async (req, res, next) => {
  try {
    const { token } = req.headers;
    const can_user_post = await validateToken(token as string);
    if (!can_user_post) {
      throw new Error('Invalid token');
    }
    const newMessage: Message = req.body;
    const insertedMessage = await addMessage(newMessage);
    io.sockets.emit('message', insertedMessage);
    res.status(201);
    res.json(insertedMessage);
  } catch (e) {
    next(e);
  }
});

export default messageRoute;
