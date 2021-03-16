import { PrismaClient } from '.prisma/client';
import { PubSub } from 'graphql-subscriptions';

export interface Context {
  prisma: PrismaClient,
  pubsub: PubSub,
  userId?: string
}

export interface SignupInput {
  email: string
  username: string
  avatar?: string
  password: string
}

export interface LoginInput {
  username: string
  password: string
}

export enum Events {
  NEW_MESSAGE='NEW_MESSAGE'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ResolverFunc<R, A> = (root: R, args: A, context: Context) => any;