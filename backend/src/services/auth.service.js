const userRepository = require('../repositories/user.repository');
const AppError = require('../utils/app-error');
const { createToken } = require('../utils/token');
const logger = require('../config/logger');

exports.register = async (data) => {
  if (await userRepository.findByEmail(data.email))
    throw new AppError('Email is already registered', 409);
  const user = await userRepository.create(data);
  logger.info('User registered', { userId: user._id, email: user.email });
  return { user, token: createToken(user) };
};
exports.login = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);
  if (!user || !(await user.comparePassword(password))) {
    logger.warn('Failed login attempt', { email });
    throw new AppError('Invalid email or password', 401);
  }
  logger.info('User logged in', { userId: user._id });
  return { user, token: createToken(user) };
};
