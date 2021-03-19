import { ResolverFunc } from '../utils/types';

const messages: ResolverFunc<unknown, unknown> = (_, __, { prisma, userId }) => {
  if(!userId) {
    throw new Error('You have to be logged in to get all the messages');
  }

  return prisma.message.findMany();
};

const me: ResolverFunc<unknown, unknown> = (_, __, { prisma, userId }) => {
  if(!userId) {
    throw new Error('You have to be logged in to get informations about your account');
  }

  return prisma.user.findUnique({
    where: {
      id: userId
    }
  });
};

export {
  messages,
  me
};