const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = async () => {
  const uri = process.env.MONGODB_ATLAS_URI;
  if (!uri) throw new Error('MONGODB_ATLAS_URI is required when DB_TYPE=atlas');
  await mongoose.connect(uri);
  logger.info('Connected to MongoDB Atlas');
};
