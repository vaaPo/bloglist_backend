//import blogs from '../datafiles/blogs_for_testing';
//const blogsfortesting = blogs;
const Blog = require('../models/blog');

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
];

const listNoLikes = {
  title: 'listNoLikes',
  author: 'Like Likes',
  url: 'http://localhost/'
};

const listLikesISNULL = {
  title: 'listLikesISNULL',
  author: 'Zorro Zorcer',
  url: 'http://localhost/',
  likes: null
};
const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
];

const blogformat = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  };
};

const blognonExistingId = async () => {
  const note = new Blog();
  await note.save();
  await note.remove();

  return note._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blogformat);
};


//letter from teacher
const dummy = (blogs) => {
  return 1;
  // ...
};

const totalLikes = (blogs) => {
//  const array1 =[{likes:3,x: 1}, {likes:300, x:2}, {likes:30,x:3}];
//  const array1 =[{likes:null,x: 1}, {likes:300, x:2}, {likes:30,x:3}];
  const array1=blogs;
  var initialValue=0;
  let total=0;
  if (array1 !== undefined) {
    if (array1.length > 0) {
    //FIXME if likes is not in the data
      total = array1.reduce( (accumulator, currentValue) => (accumulator + currentValue.likes)
        ,initialValue);
    } else {
      total = 0;
    }
  } else {
    total = 0;
  }

  return total;

};

const findWinner = (blogs) => {
  var len=blogs.length;
//  console.log('len is', len);
  var max = -Infinity;
  var maxpos = len;
  while (len--) {
    if (blogs[len].likes > max) {
      max = blogs[len].likes;
      maxpos=len;
      //console.log('maxpos is now',len,' with max',max);
    };
  };
/**
 *console.log('findWinner found maxpos', maxpos);
  console.log(blogs[maxpos].title);
  console.log(blogs[maxpos].author);
  console.log(blogs[maxpos].likes);
  */
  const winnerarr = { "title": blogs[maxpos].title, "author": blogs[maxpos].author, "likes": blogs[maxpos].likes};

  //return JSON.stringify(winnerarr); 
  return winnerarr; 
};

function groupBy(a, keyFunction) {
  const groups = {};
  a.forEach(function(el) {
    const key = keyFunction(el);
    if (key in groups === false) {
      groups[key] = [];
    }
    groups[key].push(el);
  });
  return groups;
};

const mostBlogs = (blogs) => {
  //https://stackoverflow.com/questions/51971373/group-by-count-distinct-sum-totals-from-objects-in-javascript-array
  const byAuthor = groupBy(blogs.filter(it => it._id), it => it['author']);
  const groupedbyAuthor = Object.keys(byAuthor).map(name => {
    const bytitle = groupBy(byAuthor[name], it => it.title)
    const sum = byAuthor[name].reduce((acc, it) => acc+it.likes, 0)
    return {
      'author': name,
      titles: Object.keys(bytitle).length,
      likes: sum
    };
  });
//  console.log(groupedbyAuthor);
  var len=groupedbyAuthor.length;
//  console.log('len is', len);
  var max = -Infinity;
  var maxpos = len;
  while (len--) {
    if (groupedbyAuthor[len].titles > max) {
      max = groupedbyAuthor[len].titles;
      maxpos=len;
      //console.log('maxpos is now',len,' with max',max);
    };
  };

/**
 *console.log('findWinner found maxpos', maxpos);
  console.log(groupedbyAuthor[maxpos].title)s;
  console.log(groupedbyAuthor[maxpos].author);
  console.log(groupedbyAuthor[maxpos].likes);
  */
 /**{
  author: "Robert C. Martin",
  blogs: 3
}
 */
//  const mostBlogsArr = { "author": groupedbyAuthor[maxpos].author, "titles": groupedbyAuthor[maxpos].titles, "likes": groupedbyAuthor[maxpos].likes};
  const mostBlogsArr = { "author": groupedbyAuthor[maxpos].author, "blogs": groupedbyAuthor[maxpos].titles };
  
 // console.log(mostBlogsArr);
  return mostBlogsArr; 
};

const mostLikes = (blogs) => {
  //https://stackoverflow.com/questions/51971373/group-by-count-distinct-sum-totals-from-objects-in-javascript-array
  const byAuthor = groupBy(blogs.filter(it => it._id), it => it['author']);
  const groupedbyAuthor = Object.keys(byAuthor).map(name => {
    const bytitle = groupBy(byAuthor[name], it => it.title)
    const sum = byAuthor[name].reduce((acc, it) => acc+it.likes, 0)
    return {
      'author': name,
      titles: Object.keys(bytitle).length,
      likes: sum
    };
  });
//  console.log(groupedbyAuthor);
  var len=groupedbyAuthor.length;
//  console.log('len is', len);
  var max = -Infinity;
  var maxpos = len;
  while (len--) {
    if (groupedbyAuthor[len].likes > max) {
      max = groupedbyAuthor[len].likes;
      maxpos=len;
      //console.log('maxpos is now',len,' with max',max);
    };
  };

/**
 *console.log('findWinner found maxpos', maxpos);
  console.log(groupedbyAuthor[maxpos].title)s;
  console.log(groupedbyAuthor[maxpos].author);
  console.log(groupedbyAuthor[maxpos].likes);
  */
 /**{
  author: "Edsger W. Dijkstra",
  likes: 17
}

 */
//  const mostBlogsArr = { "author": groupedbyAuthor[maxpos].author, "titles": groupedbyAuthor[maxpos].titles, "likes": groupedbyAuthor[maxpos].likes};
  const mostLikesArr = { "author": groupedbyAuthor[maxpos].author, "likes": groupedbyAuthor[maxpos].likes };
  
 // console.log(mostBlogsArr);
  return mostLikesArr; 
};

//findBlogByTitle,findBlogLikesByTitle
const findBlogByTitle = (blogs,title) => {
  var resultArr = blogs.filter(obj => {
    return obj.title === title;
  });
  return resultArr;
};

//const findme=findBlogByTitle(initialBlogs,'React patterns');
//console.log(initialBlogs);
//console.log(findme);

const findBlogLikesByTitle = (blogs,title) => {
  var resultArr = findBlogByTitle(blogs,title);
  const likesArr = resultArr.map(r => r.likes);
  return likesArr;
};

//const findmylikes=findBlogLikesByTitle(initialBlogs,'React patterns');
//console.log(findmylikes);
//[7]
//const findmylikes1=findBlogLikesByTitle(listNoLikes,'listNoLikes');
//console.log(findmylikes1);
//[ undefined ]
//const findmylikes2=findBlogLikesByTitle(listLikesISNULL,'listLikesISNULL');
//console.log(findmylikes2);
//[ null ]


//console.log(mostBlogs(initialBlogs));

//{ author: 'Robert C. Martin', blogs: 3 }
//console.log(mostLikes(initialBlogs));
//{ author: 'Edsger W. Dijkstra', likes: 17 }

/**
const mostBlogs = (blogs) => {
  var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
  const groupedArr = groupBy(blogs, "author");
  return groupedArr;
};
*/

module.exports = {
  initialBlogs, blogformat, blognonExistingId, blogsInDb,listLikesISNULL,listNoLikes,
  dummy,listWithOneBlog,
  totalLikes,findWinner,
  mostBlogs,mostLikes,
  findBlogByTitle,findBlogLikesByTitle
};
/**
console.log(dummy());
console.log(listWithOneBlog);

console.log(totalLikes(listWithOneBlog));

const kala=totalLikes(initialBlogs);

console.log(kala);

console.log(totalLikes([]));
console.log(totalLikes());
 */
//console.log(findWinner(initialBlogs));
//kala = findWinner(initialBlogs);
//console.log(kala);


/**
var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

console.log(groupBy(['one', 'two', 'three'], 'length'));
console.log(groupBy([{author:"a",likes:1}
                    ,{author:"a",likes:12}
                    ,{author:"b",likes:3}
                    ,{author:"b",likes:999}]
                    , 'author'));

juppiarr=[{author:"a",likes:1}
,{author:"a",likes:12}
,{author:"b",likes:3}
,{author:"b",likes:999}]

const kalax=groupBy(juppiarr, 'author');
console.log(kalax);
console.log(kalax[1]);




 */

//console.log('he');
//const paska=blogsInDb();
//console.log(paska);
