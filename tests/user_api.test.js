const User = require('../models/user'); // User
const { format, initialUsers, nonExistingId, usersInDb } = require('./user_test_helper');

//...

describe('when there is initially one user at db', async () => {
  beforeAll(async () => {
/**kellottaa niin prkleesti     await User.remove({});
    const user = new User({ username: 'root'
                          , name: 'root the root'
                          , password: 'sekret'
                          , adult: false });
    await user.save();
*/
    await User.remove({});

    const userObjects = initialUsers.map(n => new User(n));
    await Promise.all(userObjects.map(n => n.save()));

  });

  test('POST /api/users succeeds with a fresh username', async () => {
    const usersBeforeOperation = await usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
      adult: true
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAfterOperation = await usersInDb();
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1);
    const usernames = usersAfterOperation.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });
  test.skip('POST /api/users fails with proper statuscode and message if username already taken', async () => {
    const usersBeforeOperation = await usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body).toEqual({ error: 'username must be unique' });
    const usersAfterOperation = await usersInDb();
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length);
  });
});
