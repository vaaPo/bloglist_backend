//import blogs from '../datafiles/blogs_for_testing';
//const blogsfortesting = blogs;
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
const tblogs = [
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
  console.log('len is', len);
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

module.exports = {
  dummy,
  tblogs,
  listWithOneBlog,
  totalLikes,
  findWinner
};
/**
console.log(dummy());
console.log(listWithOneBlog);

console.log(totalLikes(listWithOneBlog));

const kala=totalLikes(tblogs);

console.log(kala);

console.log(totalLikes([]));
console.log(totalLikes());
 */
//console.log(findWinner(tblogs));
//kala = findWinner(tblogs);
//console.log(kala);
