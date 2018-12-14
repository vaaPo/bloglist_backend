const User = require('../models/user'); //User

// ...

const usersInDb = async () => {
  const users = await User.find({});
  return users;
};

 

module.exports = { usersInDb };
//  initialNotes, format, nonExistingId, notesInDb, usersInDb
//};
