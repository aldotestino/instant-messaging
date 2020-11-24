import User from '../types/User';
import userSchema from './schemas/userSchema';
import { users } from './connection';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import { v4 as uuidv4 } from 'uuid'

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
    const validUser: User = await userSchema.validateAsync(newUser);
    validUser.password = await bcrypt.hash(newUser.password, 10);
    validUser.token = String(uuidv4());
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
    const updatedUser = await users.findOneAndUpdate({ token }, { $set: { confirmed: true } });
    if (updatedUser) {
      return true;
    }
    return false;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function validateToken(token: string) {
  const user = await users.findOne({ token });
  return [user?.confirmed, user?._id];
}

async function update(token: string, newUsername: string, newPhotoUrl: string) {
  const usernameValidation = Joi.string().min(2).max(20).required();
  const photoUrlValidation = Joi.string().uri().allow('');
  try {
    const [can_user_update] = await validateToken(token);
    if (!can_user_update) {
      throw new Error('Non hai ancora confermato il tuo account!');
    }
    const validatedNewPhotoUrl = await photoUrlValidation.validateAsync(newPhotoUrl);
    const validatedNewUsername = await usernameValidation.validateAsync(newUsername);
    const updatedUser = await users.findOneAndUpdate({ token }, { $set: { username: validatedNewUsername, photoUrl: validatedNewPhotoUrl } });
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

async function updatePassword(token: string, password: string, newPassword: string) {
  const passwordValidation = Joi.string().required().min(5).required();
  try {
    const user = await users.findOne({ token });
    if (!user) {
      throw new Error('Account inesistente!');
    }
    if (!user?.confirmed) {
      throw new Error('Non hai ancora confermato il tuo account!');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error('Password errata!');
    }
    const validatedNewPassword = await passwordValidation.validateAsync(newPassword);
    const newHashedPassword = await bcrypt.hash(validatedNewPassword, 10);
    await users.findOneAndUpdate({ token }, {
      $set: {
        password: newHashedPassword
      }
    });
    return {
      message: 'Cambio password effettuato con successo!'
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

export {
  register,
  login,
  update,
  updatePassword,
  validateToken,
  activateAccount
};