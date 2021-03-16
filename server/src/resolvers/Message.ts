import { Message } from '@prisma/client';
import { ResolverFunc } from '../utils/types';

const user: ResolverFunc<Message, unknown> = ({ id }, _, { prisma }) => {
  return prisma.message.findUnique({
    where: {
      id
    }
  }).user();
};

export {
  user
};