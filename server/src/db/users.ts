import User from '../types/User';
import userSchema from './schemas/userSchema';
import { users } from './connection';
import bcrypt from 'bcrypt';
import Joi from 'joi';

async function login(username: string, password: string) {
  try {
    const user = await users.findOne({ username });
    if (!user) {
      throw new Error('Account inesistente!');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error('Password errata!');
    }
    if (!user.confirmed) {
      throw new Error('Non hai ancora confermato il tuo account!')
    }
    return user;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function register(newUser: User) {
  try {
    const validUser = await userSchema.validateAsync(newUser);
    validUser.password = await bcrypt.hash(newUser.password, 10);
    return await users.insert(validUser);
  } catch (e) {
    if (e.message.startsWith('E11000')) {
      e.message = 'Il campo "email" o "username" è già in uso!';
    }
    throw new Error(e.message);
  }
}

async function activateAccount(token: string) {
  try {
    const updatedUser = await users.findOneAndUpdate({ _id: token }, { $set: { confirmed: true } });
    if (updatedUser) {
      return true;
    }
    return false;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function validateToken(token: string) {
  const user = await users.findOne({ _id: token });
  return user?.confirmed;
}

async function update(token: string, newUsername: string, newPhotoUrl: string) {
  const usernameValidation = Joi.string().min(2).max(20).required();
  const photoUrlValidation = Joi.string().uri().allow('');
  try {
    const validatedNewPhotoUrl = await photoUrlValidation.validateAsync(newPhotoUrl);
    const validatedNewUsername = await usernameValidation.validateAsync(newUsername);
    const updatedUser = await users.findOneAndUpdate({ _id: token }, { $set: { username: validatedNewUsername, photoUrl: validatedNewPhotoUrl } });
    if (!updatedUser) {
      throw new Error('Account inesistente!');
    }
    return updatedUser;
  } catch (e) {
    if (e.message.startsWith('E11000')) {
      e.message = 'Il campo "username" è già in uso!';
    }
    throw new Error(e.message);
  }
}

export {
  register,
  login,
  update,
  validateToken,
  activateAccount
};