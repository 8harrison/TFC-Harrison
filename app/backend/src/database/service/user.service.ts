import * as Joi from 'joi';
import { compareSync } from 'bcryptjs';
import userModel from '../models/user.model';

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const login = async (email: string, password: string) => {
  const createdLogin = await userModel.findOne({ where: { email } });
  const { error } = schema.validate({ email, password });
  if (error || !createdLogin || !compareSync(password, createdLogin.dataValues.password)) {
    const e: any = { status: 401, message: 'Invalid email or password' };
    throw e;
  }
  return { type: null, message: createdLogin };
};

export default login;
