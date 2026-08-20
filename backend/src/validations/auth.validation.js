const Joi = require('joi');
exports.register = Joi.object({
  username: Joi.string().trim().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('Manager', 'Team Lead', 'Employee').default('Employee'),
  manager: Joi.string().hex().length(24).allow(null),
  teamLead: Joi.string().hex().length(24).allow(null),
});
exports.login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
