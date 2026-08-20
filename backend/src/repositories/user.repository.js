const User = require('../models/user.model');

exports.create = (data) => User.create(data);
exports.findByEmail = (email) => User.findOne({ email }).select('+password');
exports.findById = (id) => User.findById(id);
exports.findAll = () => User.find().select('-password').sort({ createdAt: -1 });
exports.findTeamMembers = (teamLeadId) => User.find({ teamLead: teamLeadId }).select('-password');
