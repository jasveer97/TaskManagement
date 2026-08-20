const service = require('../services/user.service');
exports.getAll = async (req, res, next) => {
  try {
    res.json(await service.getAll());
  } catch (error) {
    next(error);
  }
};
exports.getTeam = async (req, res, next) => {
  try {
    res.json(await service.getTeam(req.user._id));
  } catch (error) {
    next(error);
  }
};
