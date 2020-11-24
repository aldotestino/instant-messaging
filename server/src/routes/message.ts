import { Router } from 'express';
import { Server } from 'socket.io';
import Message from '../types/Message';
import { addMessage, getMessages } from '../db/messages';
import { validateToken } from '../db/users';

let io: Server;

function setSocket(socket: Server) {
  io = socket;
}

const messageRoute = Router();

messageRoute.get('/', async (req, res, next) => {
  try {
    const { token } = req.headers;
    const [can_user_read] = await validateToken(token as string);
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
    const [can_user_post, user_id] = await validateToken(token as string);
    if (!can_user_post) {
      throw new Error('Invalid token');
    }
    req.body.user_id = String(user_id);
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
export {
  setSocket
};
