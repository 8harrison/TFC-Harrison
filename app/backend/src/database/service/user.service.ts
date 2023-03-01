import userModel from '../models/user.model';

const login = async (email: string, password: string) => {
  const createdLogin = await userModel.findOne({ where: { email, password } });
  return { type: null, message: createdLogin };
};

export default login;
