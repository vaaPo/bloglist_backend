// part 4 user models for Note and end users
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  adult: Boolean,
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
});

userSchema.statics.format = (user) => {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    adult: user.adult,
    blogs: user.blogs,
    notes: user.notes
  };
};

const User = mongoose.model('User', userSchema);
/**
const User = mongoose.model('User', {
    username: String,
    name: String,
    passwordHash: String,
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
  });
 */

module.exports = User;

// call me modelsuser.User.format(user)
