const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = async () => {
  const uri = process.env.MONGODB_LOCAL_URI;
  if (!uri) throw new Error('MONGODB_LOCAL_URI is required when DB_TYPE=local');
  await mongoose.connect(uri);
  logger.info('Connected to local MongoDB');
};
