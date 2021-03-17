import { ChangePasswordInput, Events, LoginInput, ResolverFunc, SignupInput, UpdateInput } from '../utils/types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signup: ResolverFunc<unknown, SignupInput> = async (_, { password, ...rest }, { prisma }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      ...rest,
      password: hashedPassword
    }
  });

  return true;
};

const login: ResolverFunc<unknown, LoginInput> = async (_, { password, username }, { prisma }) => {
  const user = await prisma.user.findUnique({
    where: {
      username
    }
  });

  if(!user) {
    throw new Error('Utente inesistente');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if(!passwordMatch) {
    throw new Error('Password errata');
  }

  const { JWT_SECRET } = process.env;

  const token = jwt.sign(user.id, JWT_SECRET!);
  
  return {
    token,
    user
  };

};

const update: ResolverFunc<unknown, UpdateInput> = (_, { newUsername, newAvatar }, { prisma, userId }) => {
  if(!userId) {
    throw new Error('You have to be logged in to update your account');
  }

  return prisma.user.update({
    where: {
      id: userId
    },
    data: {
      username: newUsername,
      avatar: newAvatar
    }
  });
};

const changePassword: ResolverFunc<unknown, ChangePasswordInput> = async (_, { oldPassword, newPassword }, { prisma, userId }) => {
  if(!userId) {
    throw new Error('You have to be logged in to change your password');
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  if(!user) {
    throw new Error('Utente inesistente');
  }

  const passwordMatch = await bcrypt.compare(oldPassword, user?.password);

  if(!passwordMatch) {
    throw new Error('Password errata');
  }

  const password = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      password
    }
  });

  return true;
};

const deleteAccount: ResolverFunc<unknown, unknown> = async (_, __, { prisma, userId }) => {
  if(!userId) {
    throw new Error('You have to be logged in to delete your account');
  }

  await prisma.message.deleteMany({
    where: {
      userId
    }
  });

  await prisma.user.delete({
    where: {
      id: userId
    }
  });

  return true;
};

const post: ResolverFunc<unknown, {content: string}> = async (_, { content }, { prisma, pubsub, userId }) => {
  if(!userId) {
    throw new Error('You have to be logged in to post a message');
  }

  const message = await prisma.message.create({
    data: {
      content,
      user: {
        connect: {
          id: userId
        }
      }
    }
  });

  pubsub.publish(Events.NEW_MESSAGE, message);

  return message;
};

export {
  signup,
  login,
  update,
  changePassword,
  deleteAccount,
  post
};