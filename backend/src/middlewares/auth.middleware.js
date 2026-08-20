const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user.repository');
const AppError = require('../utils/app-error');
module.exports = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer '))
      throw new AppError('Authentication token is required', 401);

    const decoded = jwt.verify(header.slice(7), process.env.JWT_SECRET);
    const user = await userRepository.findById(decoded.id);

    if (!user) throw new AppError('User no longer exists', 401);
    req.user = user;
    next();

  } catch (error) {
    next(
      error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError'
        ? new AppError('Invalid or expired token', 401)
        : error
    );
  }
};
