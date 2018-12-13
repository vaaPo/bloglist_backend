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