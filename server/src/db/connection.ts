import monk from 'monk'
const connectionString = process.env.MONGOURI || 'localhost/instant-messaging';
import User from '../types/User';
import Message from '../types/Message'

const db = monk(connectionString);

const users = db.get<User>('users');
users.createIndex('username', {unique: true});
users.createIndex('email', {unique: true});

const messages = db.get<Message>('messages');

export {
  users,
  messages
};