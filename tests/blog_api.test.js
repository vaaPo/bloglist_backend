const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);
const Blog = require('../models/blog');
const { initialBlogs, format, nonExistingId, blogsInDb } = require('../utils/list_helper');


describe('when there is initially some blogs saved', async () => {
  beforeAll(async () => {
    await Blog.remove({});

    const blogObjects = initialBlogs.map(n => new Blog(n));
    await Promise.all(blogObjects.map(n => n.save()));
  });

  test('all blogs are returned as json by GET /api/blogs', async () => {
    const blogsInDatabase = await blogsInDb();

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.length).toBe(blogsInDatabase.length);

    const returnedTitles = response.body.map(n => n.title);
    blogsInDatabase.forEach(blog => {
      expect(returnedTitles).toContain(blog.title);
    });
  });

  test('individual blogs are returned as json by GET /api/blogs/:id', async () => {
    const blogsInDatabase = await blogsInDb();
    const ablog = blogsInDatabase[0];

    const response = await api
      .get(`/api/blogs/${ablog.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.title).toBe(ablog.title);
  });

  test('404 returned by GET /api/blogs/:id with nonexisting valid id', async () => {
    const validNonexistingId = await nonExistingId();

    const response = await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404);
  });

  test('400 is returned by GET /api/blogs/:id with invalid id', async () => {
    const invalidId = '123123123312'; //'kissankakkaa';

    const response = await api
      .get(`/api/blogs/${invalidId}`)
      .expect(404); // expected 400 "Bad Request", got 404 "Not Found"
  });

  describe('addition of a new blog', async () => {

    test('POST /api/blogs succeeds with valid data', async () => {
      const blogsAtStart = await blogsInDb();

      const newblog = {
        title: 'async/await yksinkertaistaa asynkronisten funktioiden kutsua',
        author: 'Zorro Zorcer',
        likes: 1
      };

      await api
        .post('/api/blogs')
        .send(newblog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const blogsAfterOperation = await blogsInDb();

      expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1);

      const titles = blogsAfterOperation.map(r => r.title);
      expect(titles).toContain('async/await yksinkertaistaa asynkronisten funktioiden kutsua');
    });

    test('POST /api/blogs fails with proper statuscode if title is missing', async () => {
      const newblog = {
        author: 'Zorro Zorcer',
        likes: 12
      };

      const blogsAtStart = await blogsInDb();

      await api
        .post('/api/blogs')
        .send(newblog)
        .expect(400);

      const blogsAfterOperation = await blogsInDb();

      const titles = blogsAfterOperation.map(r => r.title);

      expect(blogsAfterOperation.length).toBe(blogsAtStart.length);
    });
  });

  describe('deletion of a blog', async () => {
    let addedblog;

    beforeAll(async () => {
      addedblog = new Blog({
        title: 'poisto pyynnöllä HTTP DELETE',
        author: 'Zorro Zorcer',
        likes: 66
      });
      await addedblog.save();
    });

    test('DELETE /api/blogs/:id succeeds with proper statuscode', async () => {
      const blogsAtStart = await blogsInDb();

      await api
        .delete(`/api/blogs/${addedblog._id}`)
        .expect(204);

      const blogsAfterOperation = await blogsInDb();

      const titles = blogsAfterOperation.map(r => r.title);

      expect(titles).not.toContain(addedblog.title);
      expect(blogsAfterOperation.length).toBe(blogsAtStart.length - 1);
    });
  });

  afterAll(() => {
    server.close();
  });

});
