import { User } from '@prisma/client';
import { ResolverFunc } from '../utils/types';

const messages: ResolverFunc<User, unknown> = ({ id }, _, { prisma }) => {
  return prisma.user.findUnique({
    where: {
      id
    }
  }).messages();
};

export {
  messages
};