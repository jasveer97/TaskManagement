const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: { type: String, enum: ['Manager', 'Team Lead', 'Employee'], default: 'Employee' },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    teamLead: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};
userSchema.set('toJSON', {
  transform: (_, result) => {
    delete result.password;
    delete result.__v;
    return result;
  },
});
module.exports = mongoose.model('User', userSchema);
