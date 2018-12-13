//to model
/**
const Blog = mongoose.model('Blog', {
  title: String,
  author: String,
  url: String,
  likes: Number
});

module.exports = Blog;
 */
// ***********
//FIXME in index.js const Note = require('./models/notes')
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
//    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

blogSchema.statics.format = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
    //    blogs: blog.user
  };
};

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
// call me Blog.format(blog)
