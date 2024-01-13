const testCases = [
    [['a', 'b', 'c']],
    [['a', 'b', 'c'], [1, 2, 3]],
    [['a', 'b', 'c'], [1, 2, 3], ["🌒", "🌓", "🌔"]],
    [[]],
    [[], [], []],
];

const errorCases = [
    [],
    'legumes',
    undefined,
    3,
    Infinity,
    null
];

for (let i = 0; i < testCases.length; i++) {
    flattenedElement = testCases[i].reduce((acc, currentArray) => acc.concat(currentArray))
    console.log('\n' + JSON.stringify(testCases[i]) + " --> " + JSON.stringify(flattenedElement));
}
