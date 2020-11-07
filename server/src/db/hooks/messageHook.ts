import { users } from '../connection';
import Message, { Author } from '../../types/Message';

async function join(messages: Array<Message>) {
  const authors = new Map<string, Author>();
  return await Promise.all(
    messages.map(async message => {
      if (authors.has(message.user_id)) {
        message.author = authors.get(message.user_id);
      } else {
        const user = await users.findOne({ _id: message.user_id });
        if (user) {
          const author: Author = {
            username: user.username,
            photoUrl: user.photoUrl
          }
          authors.set(message.user_id, author);
          message.author = author;
        }
      }
      return message;
    })
  )
}

async function joinOne(message: Message) {
  const user = await users.findOne({ _id: message.user_id });
  if (user) {
    const author: Author = {
      username: user.username,
      photoUrl: user.photoUrl
    }
    message.author = author;
  }
  return message;
}

export {
  join,
  joinOne
};
