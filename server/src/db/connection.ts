import monk from 'monk'
import User from '../types/User';
import Message from '../types/Message'

const connectionString = process.env.MONGO_URI || 'host.docker.internal/instant-messaging';
const db = monk(connectionString);

const users = db.get<User>('users');
users.createIndex('username', { unique: true });
users.createIndex('email', { unique: true });
users.createIndex('token', { unique: true });

const messages = db.get<Message>('messages');

export {
  users,
  messages
};