//https://stackoverflow.com/questions/51971373/group-by-count-distinct-sum-totals-from-objects-in-javascript-array

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

const input = [
{
    Selcted: true,_id: '5a422a851b54a676234d17f7',
    Zone: 'React patterns',
    'Version Name': 'Michael Chan',
    url: 'https://reactpatterns.com/',
    Value: 7,
    __v: 0
},
{
    Selcted: true,_id: '5a422aa71b54a676234d17f8',
    Zone: 'Go To Statement Considered Harmful',
    'Version Name': 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    Value: 5,
    __v: 0
},
{
    Selcted: true,_id: '5a422b3a1b54a676234d17f9',
    Zone: 'Canonical string reduction',
    'Version Name': 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    Value: 12,
    __v: 0
}];

const input2 = [{
    Selcted: false,
    'Version Name': "aaa",
    Zone: "11111",
    Value: 5
},
{
    Selcted: false,
    'Version Name': "aaa",
    Zone: "11111",
    Value: 10
},
{
    Selcted: true,
    'Version Name': "aaa",
    Zone: "11111",
    Value: 15
},
{
    Selcted: true,
    'Version Name': "aaa",
    Zone: "11111",
    Value: 20
},
{
    Selcted: true,
    'Version Name': "aaa",
    Zone: "22222",
    Value: 25
},
{
    Selcted: true,
    'Version Name': "bbb",
    Zone: "22222",
    Value: 30
},
{
    Selcted: true,
    'Version Name': "bbb",
    Zone: "22222",
    Value: 35
},
{
    Selcted: true,
    'Version Name': "bbb",
    Zone: "2222",
    Value: 40
}
]

const byName = groupBy(input.filter(it => it.Selcted), it => it['Version Name'])
const output = Object.keys(byName).map(name => {
  const byZone = groupBy(byName[name], it => it.Zone)
  const sum = byName[name].reduce((acc, it) => acc + it.Value, 0)
  return {
    'Version Name': name,
    ZoneCount: Object.keys(byZone).length,
    ValueSum: sum
 }
})

const pilu=
{
Selcted: true,_id: '5a422a851b54a676234d17f7',
Zone: 'React patterns',
'Version Name': 'Michael Chan',
url: 'https://reactpatterns.com/',
Value: 7,
__v: 0
}


const tblogs = [
{
    Selcted: true, _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
}]

const byAuthor = groupBy(tblogs.filter(it => it._id), it => it['author']);
const output2 = Object.keys(byAuthor).map(name => {
  const bytitle = groupBy(byAuthor[name], it => it.title)
  const sum = byAuthor[name].reduce((acc, it) => acc+it.likes, 0)
  return {
    'author': name,
    titleCount: Object.keys(bytitle).length,
    ValueSum: sum
  }
})
  
console.log(output2)




console.log(output)
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