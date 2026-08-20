const userRepository = require('../repositories/user.repository');
exports.getAll = () => userRepository.findAll();
exports.getTeam = (teamLeadId) => userRepository.findTeamMembers(teamLeadId);
