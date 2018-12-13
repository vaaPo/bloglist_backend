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
  test('when list has teachers example tblogs', () => {
    const result = listHelper.totalLikes(listHelper.tblogs);
    expect(result).toBe(36);
  });

});
