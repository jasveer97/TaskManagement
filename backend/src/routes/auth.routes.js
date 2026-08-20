const router = require('express').Router();
const controller = require('../controllers/auth.controller');
const validate = require('../middlewares/validation.middleware');
const schema = require('../validations/auth.validation');

router.post('/register', validate(schema.register), controller.register);
router.post('/login', validate(schema.login), controller.login);

module.exports = router;
