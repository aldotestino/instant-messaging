import { ApolloServer, PubSub } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import EventEmitter from 'events';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { getUserId } from './utils/getUserId';

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

const port = process.env.PORT || 4000;

server.listen({ port }).then(({ url }) => console.log(`Server running at ${url}`));