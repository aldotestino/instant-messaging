import { Request } from 'express';
import jwt from 'jsonwebtoken';

export function getUserId(req: Request): string | null {
  if(!req.headers.authorization) {
    return null;
  }
  const { JWT_SECRET } = process.env;
  return String(jwt.verify(req.headers.authorization, JWT_SECRET!));
}