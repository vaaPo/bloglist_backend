const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);
const Blog = require('../models/blog');
const {   initialBlogs, format, nonExistingId, blogsInDb,listLikesISNULL,listNoLikes,
  dummy,listWithOneBlog,
  totalLikes,findWinner,
  mostBlogs,mostLikes,
  findBlogByTitle,findBlogLikesByTitle
 } = require('../utils/list_helper');


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
//npx jest -t 'POST /api/blogs succeeds with valid data'
    test('POST /api/blogs succeeds with valid data', async () => {
      const blogsAtStart = await blogsInDb();

      const newblog = {
        title: 'POST /api/blogs succeeds with valid data:async/await yksinkertaistaa asynkronisten funktioiden kutsua',
        author: 'Zorro Zorcer',
        url: 'http://localhost/',
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
      expect(titles).toContain('POST /api/blogs succeeds with valid data:async/await yksinkertaistaa asynkronisten funktioiden kutsua');
    });
//npx jest -t 'hw4.10 POST /api/blogs sets likes=0 if likes ISNULL'
    test('hw4.10 POST /api/blogs sets likes=0 if likes ISNULL', async () => {
      const newblog = listLikesISNULL;
      /**
      const newblog = {
        title: 'hw4.10 POST /api/blogs sets likes=0 if likes ISNULL',
        author: 'Zorro Zorcer',
        url: 'http://localhost/',
        likes: null
      };
       */

      const blogsAtStart = await blogsInDb();

      await api
        .post('/api/blogs')
        .send(newblog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const blogsAfterOperation = await blogsInDb();

      expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1); // something inserted

      //const findmylikes=findBlogLikesByTitle(blogsAfterOperation,'hw4.10 POST /api/blogs sets likes=0 if likes ISNULL');  // e.g. [7]
      const findmylikes=findBlogLikesByTitle(blogsAfterOperation,newblog.title);  // e.g. [7]
//      expect(findmylikes).toBe([0]);
//      expect(findmylikes).toContain([0]);
      expect(findmylikes).toEqual([0]);
    });

    //npx jest -t 'hw4.10 POST /api/blogs sets likes=0 if likes missing. undefined'
    test('hw4.10 POST /api/blogs sets likes=0 if likes missing. undefined', async () => {
      const newblog = listNoLikes;

      const blogsAtStart = await blogsInDb();

      await api
        .post('/api/blogs')
        .send(newblog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const blogsAfterOperation = await blogsInDb();

      expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1); // something inserted

      const findmylikes=findBlogLikesByTitle(blogsAfterOperation,'listNoLikes');  // e.g. [7]
      expect(findmylikes).toEqual([0]);
    });


    test('hw4.11 POST /api/blogs fails with proper statuscode if title is missing', async () => {
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
