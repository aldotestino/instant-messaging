import Message from '../types/Message';
import messageSchema from './schemas/messageSchema';
import { messages } from "./connection";
import { join, joinOne } from "./hooks/messageHook";

async function addMessage(newMessage: Message) {
  try {
    const validMessage = await messageSchema.validateAsync(newMessage);
    const insertedMessage = await messages.insert(validMessage);
    return await joinOne(insertedMessage);
  } catch (e) {
    throw new Error(e.message);
  }
}

async function getMessages() {
  return await join(await messages.find());
}

export {
  addMessage,
  getMessages
}
