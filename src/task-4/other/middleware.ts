import * as jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import { User } from '../mongo';

export const verify = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers['x-access-token'] as string; // use token from header

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    // create  global variable to use in any request
    const decoded = jwt.verify(token, 'task4') as jwt.JwtPayload;
    const { email } = decoded;
    req.headers.authorization = email;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};
// check the user to see if he is an admin
export const admin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = await User.findOne({ email: req.headers.authorization });
  if (!user) {
    res.status(400).send('User does not exist');
  } else {
    if (user.admin) {
      return next();
    } else {
      return res.status(400).send('You need admin permission');
    }
  }
};
