const logger = require('../config/logger');
module.exports = (error, req, res, next) => {
  logger.error(error.message, { stack: error.stack, path: req.originalUrl });
  const status = error.statusCode || 500;
  res.status(status).json({ message: status === 500 ? 'Internal server error' : error.message });
};
