import User from '../types/User';
import userSchema from "./schemas/userSchema";
import {users} from './connection';
import bcrypt from 'bcrypt';

async function login(username: string, password: string) {
  try {
    const user = await users.findOne({username});
    if(!user) {
      throw new Error('User doesn\'t exist');
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match) {
      throw new Error('Incorrect password');
    }
    return user;
  }catch(e) {
    throw new Error(e.message);
  }
}

async function register(newUser: User) {
  try {
    const validUser = await userSchema.validateAsync(newUser);
    validUser.password = await bcrypt.hash(newUser.password, 10);
    return await users.insert(validUser);
  }catch (e) {
    if(e.message.startsWith('E11000')) {
      e.message = 'Field "email" or "username" is already in use';
    }
    throw new Error(e.message);
  }
}

async function validateToken(token: string) {
  const user = await users.findOne({_id: token});
  return !!user;
}

export {
  register,
  login,
  validateToken
};