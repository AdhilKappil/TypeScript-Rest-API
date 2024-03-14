import jwt, { Secret } from 'jsonwebtoken';
import { Response } from 'express';
import { Document } from 'mongoose';

export const genarateToken = (res: Response, userId: Document) => {
  console.log('token generating');
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as Secret, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};