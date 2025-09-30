import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import User from "../db/models/User.js";


export const getUser = async query => {
  const user = await User.findOne({ where: query });
  return user;
};


export const getUserById = async id => {
  const user = await User.findByPk(id);
  return user;
};


export const register = async (data) => {
  const { email, password } = data;
  if (!email || !password) {
    throw createHttpError(400, 'All fields are required');
  }
  const existingUser = await getUser({ email });
  if (existingUser) {
    throw createHttpError(409, 'Email already in use');
  }
  const hashedPassword = password && (await bcrypt.hash(password, 10));
  const newUser = await User.create({
    email,
    password: hashedPassword,
  });
  return {
    email: newUser.email,
  };
}

export const login = async (data) => {
  const { email, password } = data;
  if (!email || !password) {
    throw createHttpError(400, 'All fields are required');
  }
  
  const user = await getUser({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid email or password');
  }
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw createHttpError(401, 'Invalid email or password');
  }
  
  return {
    id: user.id,
    email: user.email,
    role: user.role
  };
}
