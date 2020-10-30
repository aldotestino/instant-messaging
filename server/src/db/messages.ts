import Message from "../types/Message";
import messageSchema from './schemas/messageSchema';
import {messages} from "./connection";

async function addMessage(newMessage: Message)  {
  try {
    const validMessage = await messageSchema.validateAsync(newMessage);
    return await messages.insert(validMessage);
  }catch (e) {
    throw new Error(e.message);
  }
}

async function getMessages() {
  return await messages.find();
}

export {
  addMessage,
  getMessages
}
