const listHelper = require('../utils/list_helper');
//Describejen avulla yksittäisessä tiedostossa olevat testit voidaan jaotella loogisiin kokonaisuuksiin.
//Testituloste hyödyntää myös describe-lohkon nimeä:

describe('bloglist tests', () => {
  test('dummy is called', () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe('total likes', () => {
  test('when bloglist is undefined', () => {
    const result = listHelper.totalLikes();
    expect(result).toBe(0);
  });
  test('when list is empty array', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listHelper.listWithOneBlog);
    expect(result).toBe(5);
  });
  test('when list has teachers example initialBlogs', () => {
    const result = listHelper.totalLikes(listHelper.initialBlogs);
    expect(result).toBe(36);
  });
});
describe('favorite blogs and most blogging authors', () => {
  test('hw4.5* find favorite blog from teachers blogs', () => {
    const result = listHelper.findWinner(listHelper.initialBlogs);
    expect(result).toEqual({title: "Canonical string reduction",author: "Edsger W. Dijkstra",likes: 12});
  });
  test('hw4.6* find most blogging author from teachers blogs', () => {
    const result = listHelper.mostBlogs(listHelper.initialBlogs);
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3}); //, likes: 12});
  });
  test('hw4.7* find most likes author from teachers blogs', () => {
    const result = listHelper.mostLikes(listHelper.initialBlogs);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
  });
});