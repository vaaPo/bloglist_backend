const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../../models/user'); //User
const Note = require('../../models/note');

//UserUser
//UserUser.format

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const existingUser = await User.find({ username: body.username });
    if (existingUser.length>0) {
      return response.status(400).json({ error: 'username must be unique' });
    }

    /**Voisimme toteuttaa käyttäjien luomisen yhteyteen myös muita tarkistuksia,
     *  esim. onko käyttäjätunnus tarpeeksi pitkä,
     * koostuuko se sallituista merkeistä
     * ja onko salasana tarpeeksi hyvä. Jätämme ne kuitenkin harjoitustehtäväksi.
     *
     */
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    });

    const savedUser = await user.save();

    response.json(User.format(savedUser));
  } catch (exception) {
    console.log(exception);
    response.status(500).json({ error: 'something went wrong...' });
  }
});

usersRouter.get('/', async (request, response) => {
  try {const users = await User
    .find({}, {
      __v: 0
    })
  //    .populate('notes')                   // non-consistent outer-join to notes chained to find
    .populate('notes', {
      content: 1,
      important: 1,
      date: 1
    });
  response.json(users.map(User.format)); //User.format defined in models/user.js
  } catch (exception) {
    console.log(exception);
    response.status(400).send({ error: 'something went royally wrong in your request' });
  }
});

usersRouter.delete('/:id', async (request, response) => { ///api/users/:id
  console.log('personsRouter.delete /api/persons/:id', request.params.id);
  //mongoose.set('useFindAndModify', false);
  try {
    await User.findByIdAndRemove(request.params.id);
    //        .findOneAndRemove({ _id: request.params.id })
    response.status(204).end(); //no content
  } catch (exception) {
    console.log(exception);
    response.status(400).send({ error: 'malformatted id' }); // e.g. FOOBAR
  }
});  //notesRouter.delete('/api/notes/:id

usersRouter.get('/:id', async (request, response) => { ///api/users/:id
  try {const user= await User.findById(request.params.id)
    .populate('notes', {
      content: 1,
      important: 1,
      date: 1
    });
  if (user) {
    response.json(User.format(user));
  } else {
    response.status(404).end(); // request ok format, but id not found=404 !!!
  }
  } catch (exception) {
    console.log(exception);
    response.status(400).send({ error: 'malformatted id' });
  }
}); //usersRouter.get('/api/users/:id'

module.exports = usersRouter;
/**
 * const usersRouter = require('./controllers/ES7/ASYNCuserscontroller')

// ...

app.use('/api/users', usersRouter)

 */