require('dotenv').config();
const app = require('./src/app');
const logger = require('./src/config/logger');
const connectLocal = require('./src/config/db.local');
const connectAtlas = require('./src/config/db.atlas');

const port = process.env.PORT || 5000;
const connectDatabase = process.env.DB_TYPE === 'atlas' ? connectAtlas : connectLocal;

connectDatabase()
  .then(() => app.listen(port, () => logger.info(`Server listening on port ${port}`)))
  .catch((error) => {
    logger.error('Database startup failed', { message: error.message });
    process.exit(1);
  });
