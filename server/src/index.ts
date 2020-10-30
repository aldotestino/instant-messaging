import express, { NextFunction, Request, Response } from 'express';
import socket_io from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => console.log(`Listening on http:\\localhost:${PORT}`));
const io = socket_io(server);

import userRoute from './routes/user';
import messageRoute from "./routes/message";

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use('/api/v1/user', userRoute);
app.use('/api/v1/messages', messageRoute);

app.get('/', (req, res) => {
  res.json({
    message: 'Instant Messaging Server'
  });
});

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  res.status(400);
  res.json({
    error: err.message
  });
});

export {
  io
};