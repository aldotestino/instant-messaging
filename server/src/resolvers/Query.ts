import { ResolverFunc } from '../utils/types';

const messages: ResolverFunc<unknown, unknown> = (_, __, { prisma, userId }) => {
  if(!userId) {
    throw new Error('You have to be logged in to get all the messages');
  }

  return prisma.message.findMany();
};

export {
  messages
};