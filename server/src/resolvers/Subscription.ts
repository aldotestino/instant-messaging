import { Message } from '.prisma/client';
import { Events, ResolverFunc } from '../utils/types';

const newMessageSubscriber: ResolverFunc<unknown, unknown> = (_, __, { pubsub, userId }) => {
  if(!userId) {
    throw new Error('You have to be logged in to receive new messages');
  }

  return pubsub.asyncIterator(Events.NEW_MESSAGE);
};

const newMessage = {
  subscribe: newMessageSubscriber,
  resolve: (payload: Message): Message => payload
};

export {
  newMessage
};