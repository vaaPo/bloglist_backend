// to router
// *******************************************

const blogsRouter = require('express').Router();
const Blog = require('../../models/blog');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');          // user in mongodb and token genkey in .env

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

//const modelsuser = require('../../models/user'); //User

// call me Blog.format(Blog)

//console.log('blogsRouter awake');
//console.log('require ../models/blog');
/**
A router object is an isolated instance of middleware and routes.
You can think of it as a “mini-application,”
capable only of performing middleware and routing functions.
Every Express application has a built-in app router.
*/
/** this is ES7 async/await controller version
 *  this is going to be ported from ES6 promises to ES7 async await */
/** the ES6 promises versions are in their own directory */
blogsRouter.get('/', async (request, response) => {//blogsRouter.get('/'
  try { const blogs = await Blog
    .find({}, {
      __v: 0
    })
    .populate('user', {
      username: 1,
      name: 1
    });
  response.json(blogs.map(Blog.format));
  } catch (exception) {
    console.log(exception);
    response.status(400).send({ error: 'something went royally wrong in your request' });
  }
}); //blogsRouter.get('/'


blogsRouter.get('/:id', async (request, response) => {//blogsRouter.get('/:id'
  try {
    const getBlog = await Blog.findById(request.params.id)
      .populate('user', {
        id: 1,
        username: 1,
        name: 1
      });

    if (getBlog) {
      response.json(Blog.format(getBlog));
    } else {
      response.status(404).end(); // request ok format, but id not found = 404 !!!
    }

  } catch (exception) {
    console.log(exception);
    response.status(400).send({ error: 'malformatted id' });
  }
}); //blogsRouter.get('/:id'

blogsRouter.post('/', async (request, response) => { //('/api/Blogs'
  const body = request.body;
  try {

    /**
 *
     const token = getTokenFrom(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    };
*/
    if (body.title === undefined) {
      return response.status(400).json({ error: 'title missing' });
    }

    if (body.title === null) {
      return response.status(400).json({ error: 'title is null' });
    }

    if (body.url === undefined) {
      return response.status(400).json({ error: 'url missing' });
    }

    if (body.url === null) {
      return response.status(400).json({ error: 'url is null' });
    }

    if (body.likes === undefined) {
      body.likes = 0;
    }

    if (body.likes === null) {
      body.likes = 0;
    }


    //    const user = await User.findById(body.userId);
    const user = await User.findOne({username: "root"});
    
    const postBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    });

    //console.log('blogsRouter.post user._id',blog.user);
    const savedBlog = await postBlog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();                                      // stores to users collection the new Blog id for the user, so user can have several Blogs
    response.json(Blog.format(postBlog));
  }  catch(exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message });
    } else {
      console.log(exception);
      response.status(500).json({ error: 'something went wrong...' });
    }
  }}); //blogsRouter.post('/'

/**letter from teacher had this, strange codes too
  blogsRouter.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body);

    blog
      .save()
      .then(result => {
        response.status(201).json(result);
      });
  });
  */

blogsRouter.put('/:id', async (request, response) => { //blogsRouter.put('/:id'
  //console.log('blogsRouter.put request.params.id', request.params.id);
  const body = request.body;
  //console.log('blogsRouter.put body.content:', body.title);
  //console.log('blogsRouter.put body.important:', body.likes);
  if (body.title === undefined) {
    return response.status(400).json({ error: 'title missing' });
  }

  if (body.title === null) {
    return response.status(400).json({ error: 'title is null' });
  }

  if (body.url === undefined) {
    return response.status(400).json({ error: 'url missing' });
  }

  if (body.url === null) {
    return response.status(400).json({ error: 'url is null' });
  }

  if (body.likes === undefined) {
    body.likes = 0;
  }

  if (body.likes === null) {
    body.likes = 0;
  }

  try {
    const savedBlog = await Blog
      .findByIdAndUpdate(request.params.id, {
        $set: {
          likes: body.likes
        }
      }, {
        new: true
      });
    response.json(Blog.format(savedBlog));
  } catch (exception) {
    console.log(exception);
    response.status(400).json({ error: 'something went wrong...' });
  }
}); //blogsRouter.put('/:id'

blogsRouter.delete('/:id', async (request, response) => { ///api/Blogs/:id
  try {
    await Blog.findByIdAndRemove(request.params.id);
    //FIXME implement put for user which removes the Blog to be removed from users collection

    response.status(204).end(); //no content
  } catch (exception) {
    console.log(exception);
    response.status(400).send({ error: 'malformatted id' }); // e.g. FOOBAR
  }
});  //blogsRouter.delete('/api/Blogs/:id


//}
module.exports = blogsRouter;