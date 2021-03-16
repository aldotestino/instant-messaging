import { Events, LoginInput, ResolverFunc, SignupInput } from '../utils/types';
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
    throw new Error('User doesn\'t exist');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if(!passwordMatch) {
    throw new Error('Incorrect password');
  }

  const { JWT_SECRET } = process.env;

  const token = jwt.sign(user.id, JWT_SECRET!);
  
  return {
    token,
    user
  };

};

const post: ResolverFunc<unknown, {content: string}> = async (_, { content }, { prisma, pubsub, userId }) => {
  if(!userId) {
    throw new Error('You have to be logged in to post a message!');
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
  post
};