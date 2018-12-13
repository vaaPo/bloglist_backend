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
}

const input = [{
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


console.log(output)