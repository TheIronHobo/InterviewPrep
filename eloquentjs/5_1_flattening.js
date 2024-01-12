let singleArray = [['a','b','c']];
let doubleArray = [['a','b','c'], [1, 2, 3]];
let tripleArray = [['a','b','c'], [1, 2, 3], ["🌒", "🌓", "🌔"]];

let flattenedSingleArray = singleArray.reduce((acc, currentArray) => acc.concat(currentArray));
let flattenedDoubleArray = doubleArray.reduce((acc, currentArray) => acc.concat(currentArray));
let flattenedTripleArray = tripleArray.reduce((acc, currentArray) => acc.concat(currentArray));

console.log('\n');
console.log("flattenedSingleArray   | " + JSON.stringify(flattenedSingleArray));
console.log("flattenedDoubleArray   | " + JSON.stringify(flattenedDoubleArray));
console.log("flattenedTripleArray   | " + JSON.stringify(flattenedTripleArray));
console.log('\n');

let doubleNestedEmptyArray = [[]];
let flattenedDoubleNestedEmptyArray = doubleNestedEmptyArray.reduce((acc, currentArray) => acc.concat(currentArray));
console.log("dobuleNestedEmptyArray | " + JSON.stringify(flattenedDoubleNestedEmptyArray));

let emptyArray = [];
let flattenedEmptyArray = emptyArray.reduce((acc, currentArray) => acc.concat(currentArray)); // Error
