const supertest = require('supertest');

const {
  app,
  server
} = require('../index');
const api = supertest(app);

const User = require('../models/user'); // User
const {
  format,
  initialUsers,
  nonExistingId,
  usersInDb,
  userdummy
} = require('../utils/user_test_helper');

describe('user collection tests, removing first users then testing', async () => {
  beforeAll(async () => {
    await User.remove({});
    const user = new User({
      username: 'root',
      name: 'root the root',
      password: 'sekret',
      adult: false
    });
    await user.save();

    //  await User.remove({});

    //  const userObjects = initialUsers.map(n => new User(n));
    //  await Promise.all(userObjects.map(n => n.save()));

  });

  test('userdummy', async () => {
    const kala = userdummy([]);
    expect(kala).toBe(1);
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
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1);
    const usernames = usersAfterOperation.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });
  test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
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

    expect(result.body).toEqual({
      error: 'username must be unique'
    });
    const usersAfterOperation = await usersInDb();
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length);
  });

  test('hw 4.16* POST error 400 password too short', async () => {
    const usersBeforeOperation = await usersInDb();

    const newUser = {
      username: 'root123',
      name: 'Superuser',
      password: '123'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body).toEqual({
      error: 'password too short'
    });
    const usersAfterOperation = await usersInDb();
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length);
  });

  test('hw 4.16* POST error 400 password is undefined', async () => {
    const usersBeforeOperation = await usersInDb();

    const newUser = {
      username: 'root123123',
      name: 'Superuser'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body).toEqual({
      error: 'password is undefined'
    });
    const usersAfterOperation = await usersInDb();
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length);
  });
  
  test('hw 4.16* POST error 400 password is null', async () => {
    const usersBeforeOperation = await usersInDb();

    const newUser = {
      username: 'root123123123',
      name: 'Superuser',
      password: null
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body).toEqual({
      error: 'password is null'
    });
    const usersAfterOperation = await usersInDb();
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length);
  });

  afterAll(() => {
    server.close();
  });
});