const User = require('../models/user'); //User

// ...
const initialUsers = [{
  username: 'root',
  name: 'root the root',
  password: 'sekret',
  adult: false },
{ username: 'led',
  name: 'led zeppelin',
  password: 'sekret',
  adult: true }
];

const usersInDb = async () => {
  const users = await User.find({});
  return users;
};

const userdummy = (users) => {
  return 1;
  // ...
};
/** const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(format);
};
*/
module.exports = { usersInDb,initialUsers,userdummy };
//  initialNotes, format, nonExistingId, notesInDb, usersInDb
//};
//console.log('he');

//const paska=usersInDb();
//console.log(paska);