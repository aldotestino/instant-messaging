const isProduction = process.env.NODE_ENV === 'production';
export const CLIENT_URI = isProduction ? 'https://instant-messaging.vercel.app' : 'http://localhost:3000';
export const SERVER_URI = isProduction ? 'api-instant-messaging-production.up.railway.app' : 'http://localhost:4000';