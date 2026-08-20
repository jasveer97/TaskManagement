const Joi = require('joi');
const fields = {
  title: Joi.string().trim().min(1).max(150),
  description: Joi.string().trim().min(1).max(2000),
  status: Joi.string().valid('pending', 'completed'),
  assignedTo: Joi.string().hex().length(24),
};
exports.create = Joi.object({
  ...fields,
  title: fields.title.required(),
  description: fields.description.required(),
});
exports.update = Joi.object(fields).min(1);
