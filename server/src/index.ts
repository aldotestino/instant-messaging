import { ApolloServer, PubSub } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { getUserId } from './utils/getUserId';

const prisma = new PrismaClient();
const pubsub = new PubSub();

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

server.listen().then(({ url }) => console.log(`Server running at ${url}`));