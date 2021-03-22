import { ApolloServer, PubSub } from 'apollo-server-express';
import http from 'http';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import EventEmitter from 'events';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { getUserId } from './utils/auth';
import { CLIENT_URI } from './utils/config';

const prisma = new PrismaClient();

const emitter = new EventEmitter();
emitter.setMaxListeners(100);
const pubsub = new PubSub({ eventEmitter: emitter });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, connection }) => ({
    ...req,
    prisma,
    pubsub,
    userId: req ? getUserId(req) : connection ? getUserId(connection.context) : null
  }),
  subscriptions: {
    onConnect: (connectionParams: any) => ({
      headers: {
        authorization: connectionParams?.authorization
      }
    })
  }
});

const app = express();

app.get('/authenticate/:id', async (req, res) => {
  const { id } = req.params;

  await prisma.user.update({
    where: {
      id
    },
    data: {
      authenticated: true
    }
  });
  
  res.redirect(`${CLIENT_URI}/login`);
}); 

server.applyMiddleware({ app });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});