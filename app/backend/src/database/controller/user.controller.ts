import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import login from '../service/user.service';

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const createdLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });
  const { type, message } = await login(email, password);

  const token = jwt.sign({ message }, secret, { expiresIn: '7d', algorithm: 'HS256' });
  if (type) return res.status(500).json(message);

  return res.status(200).json({ token });
};

export default createdLogin;
