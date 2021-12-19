import type { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../mongo';
import * as dotenv from 'dotenv';
dotenv.config();
/**
 * Create user
 * @param {string} name Set name from form.
 * @param {string} email Set email from form.
 * @param {string} password Set password from form.
 * @param {string} admin Set admin from form.
 */
// const p = process.env.KEY
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, admin } = req.body;
    const old_user = await User.findOne({ email });
    if (old_user) {
      res.status(409).send('User Already Exist. Please Login'); // check user
    }
    const encrypted_password = await bcrypt
      .hash(password, 10)
      .catch((error: any) => {
        //hash password
        res.json({ error });
      });
    const token = jwt.sign({ email }, process.env.KEY as string, {
      expiresIn: '2h',
    }); //create token
    const newUser = new User({
      name: name,
      email: email,
      password: encrypted_password,
      token: token, // create user
      admin,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: 'Fail to create' });
  }
};
/**
 * Login user
 * @param {string} email Set email from form.
 * @param {string} password Set password from form.
 */

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send('All required');
    }
    const user = await User.findOne({ email });
    //check user and password
    if (user && (await bcrypt.compare(password, user.password))) {
      user.token = jwt.sign({ email }, process.env.KEY as string, {
        expiresIn: '2h',
      });

      res.status(200).json(user);
    }
  } catch (e) {
    res.status(400).json({ error: 'Fail to create' });
  }
};
