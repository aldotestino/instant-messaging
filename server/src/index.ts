import express, { NextFunction, Request, Response } from 'express';
import socket_io from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';
require('dotenv').config();
import userRoute from './routes/user';
import messageRoute, { setSocket } from './routes/message';

const app = express();

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Listening @${PORT}`);
});
const io = socket_io(server);

setSocket(io);

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use('/api/v1/user', userRoute);
app.use('/api/v1/messages', messageRoute);

app.get('/', (_req, res) => {
  const client_url = process.env.CLIENT_URL || 'http://localhost:3000';
  res.redirect(client_url);
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(400);
  res.json({
    error: err.message
  });
});