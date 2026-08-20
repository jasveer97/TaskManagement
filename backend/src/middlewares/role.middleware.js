const AppError = require('../utils/app-error');
module.exports =
  (...roles) =>
  (req, res, next) =>
    roles.includes(req.user.role)
      ? next()
      : next(new AppError('You are not authorized for this action', 403));
