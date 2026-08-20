const Task = require('../models/task.model');
const populated = (query) =>
  query.populate('assignedTo', 'username email role').populate('createdBy', 'username email role');

exports.create = (data) => Task.create(data);
exports.find = (filter) => populated(Task.find(filter).sort({ createdAt: -1 }));
exports.findById = (id) => populated(Task.findById(id));
exports.update = (id, data) =>
  populated(Task.findByIdAndUpdate(id, data, { new: true, runValidators: true }));
exports.remove = (id) => Task.findByIdAndDelete(id);
