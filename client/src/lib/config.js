const SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://server-instant-messaging.herokuapp.com' : 'http://localhost:3001';
console.log(SERVER_URL);
const ACCENT_COLOR = 'purple';

export {
  SERVER_URL,
  ACCENT_COLOR
};