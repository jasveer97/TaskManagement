const router = require('express').Router();
const controller = require('../controllers/task.controller');
const auth = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const schema = require('../validations/task.validation');

router.use(auth);

router.route('/')
  .post(validate(schema.create), controller.create)
  .get(controller.getAll);
router
  .route('/:id')
  .get(controller.getOne)
  .patch(validate(schema.update), controller.update)
  .delete(controller.remove);

module.exports = router;
