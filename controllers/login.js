const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const body = request.body;
  //console.log('loginRouter request.body',body);
  const user = await User.findOne({ username: body.username });
  //console.log('loginRouter user.passwordHash',user.passwordHash);
  const passwordCorrect = user === null ?
    false :
    await bcrypt.compare(body.password, user.passwordHash);

  console.log('loginRouter bcrypt.compare, passwordCorrect',passwordCorrect);

  if ( !(user && passwordCorrect) ) {
    return response.status(401).json({ error: 'invalid username or password' });
  }

  const userForToken = {
    username: user.username,
    id: user._id
  };

  const token = jwt.sign(userForToken, process.env.SECRET);  //FIXME .env add SECRET

  response.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
/**
 * const loginRouter = require('./controllers/login')

//...

app.use('/api/login', loginRouter)

 */