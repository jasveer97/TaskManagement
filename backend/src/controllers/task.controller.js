const service = require('../services/task.service');

exports.create = async (req, res, next) => {
  try {
    res.status(201).json(await service.create(req.user, req.body));
  } catch (error) {
    next(error);
  }
};
exports.getAll = async (req, res, next) => {
  try {
    res.json(await service.getAll(req.user, req.query.status));
  } catch (error) {
    next(error);
  }
};
exports.getOne = async (req, res, next) => {
  try {
    res.json(await service.getOne(req.user, req.params.id));
  } catch (error) {
    next(error);
  }
};
exports.update = async (req, res, next) => {
  try {
    res.json(await service.update(req.user, req.params.id, req.body));
  } catch (error) {
    next(error);
  }
};
exports.remove = async (req, res, next) => {
  try {
    await service.remove(req.user, req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
