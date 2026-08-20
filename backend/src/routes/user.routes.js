const router = require('express').Router();
const controller = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');

router.use(auth);
router.get('/', role('Manager'), controller.getAll);
router.get('/team', role('Team Lead'), controller.getTeam);

module.exports = router;
