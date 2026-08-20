const taskRepository = require('../repositories/task.repository');
const userRepository = require('../repositories/user.repository');
const AppError = require('../utils/app-error');

const canAccessAssignee = async (actor, assigneeId) => {
  if (actor.role === 'Manager' || actor._id.toString() === assigneeId.toString()) return true;
  if (actor.role !== 'Team Lead') return false;
  const user = await userRepository.findById(assigneeId);
  return user && user.teamLead && user.teamLead.toString() === actor._id.toString();
};

exports.create = async (actor, data) => {
  const assignedTo = actor.role === 'Employee' ? actor._id : data.assignedTo || actor._id;
  if (!(await canAccessAssignee(actor, assignedTo)))
    throw new AppError('You can assign tasks only to your team members or yourself', 403);
  const task = await taskRepository.create({ ...data, assignedTo, createdBy: actor._id });
  return taskRepository.findById(task._id);
};

exports.getAll = async (actor, status) => {
  const filter = status ? { status } : {};
  if (actor.role === 'Manager') return taskRepository.find(filter);
  if (actor.role === 'Team Lead') {
    const team = await userRepository.findTeamMembers(actor._id);
    filter.assignedTo = { $in: [actor._id, ...team.map((u) => u._id)] };
  }
  if (actor.role === 'Employee') filter.assignedTo = actor._id;
  return taskRepository.find(filter);
};

exports.getOne = async (actor, id) => {
  const task = await taskRepository.findById(id);
  if (!task) throw new AppError('Task not found', 404);
  const own =
    task.assignedTo._id.toString() === actor._id.toString() ||
    task.createdBy._id.toString() === actor._id.toString();
  const teamAccess =
    actor.role === 'Team Lead' && (await canAccessAssignee(actor, task.assignedTo._id));
  if (actor.role !== 'Manager' && !own && !teamAccess)
    throw new AppError('Not authorized to view this task', 403);
  return task;
};

exports.update = async (actor, id, data) => {
  const task = await exports.getOne(actor, id);
  if (actor.role === 'Employee' && task.assignedTo._id.toString() !== actor._id.toString())
    throw new AppError('You can update only your own tasks', 403);
  if (actor.role === 'Employee') delete data.assignedTo;
  if (data.assignedTo && !(await canAccessAssignee(actor, data.assignedTo)))
    throw new AppError('You can assign tasks only to your team members or yourself', 403);
  return taskRepository.update(id, data);
};

exports.remove = async (actor, id) => {
  if (actor.role !== 'Manager') throw new AppError('Only managers can delete tasks', 403);
  const task = await taskRepository.remove(id);
  if (!task) throw new AppError('Task not found', 404);
};
