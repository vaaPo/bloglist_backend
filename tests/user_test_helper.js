const User = require('../models/user'); //User

// ...
const initialUsers = { username: 'root',
                        name: 'root the root',
                        password: 'sekret',
                        adult: false };

const usersInDb = async () => {
  const users = await User.find({});
  return users;
};
/** const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(format);
};
*/
module.exports = { usersInDb,initialUsers };
//  initialNotes, format, nonExistingId, notesInDb, usersInDb
//};
//console.log('he');
//const paska=usersInDb();
//console.log(paska);