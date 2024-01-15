function everythingSome(inputArray, testFunction) {
    const antiTest = j => !testFunction(j);
    return inputArray.some(testFunction) && !inputArray.some(antiTest);
}

function everythingLoop(inputArray, testFunction) {
    for (let element of inputArray) {
        if (!testFunction(element)) {
            return false
        }
    }
    return true;
}

const greaterThanN = n => (x => x > n);
const greaterThanZero = greaterThanN(0);
const greaterThanTwo = greaterThanN(2);
const greaterThanTen = greaterThanN(10);
const greaterThanNegativeFifty = greaterThanN(-50);
const greaterThanFifty = greaterThanN(50);

const testCases = [
    [0, 1, 2, 3],
    [1, 2, 3],
    [-2, -1, 0, 1, 2],
    [-2, -1, 0],
    [-2, -1],
    [0],
    [10, 11, 12],
    [-12, -11, -10],
    [65, -766, 432, -1, 8],
];

const testFunctionDictionary = {
    greaterThanZero: greaterThanZero,
    greaterThanTwo: greaterThanTwo,
    greaterThanTen: greaterThanTen,
    greaterThanNegativeFifty: greaterThanNegativeFifty,
    greaterThanFifty: greaterThanFifty,
}

console.log("Testing Everything Some...\n");

let passesAllTests = true;

for (let testArray of testCases) {
    for (const [name, func] of Object.entries(testFunctionDictionary)) {
        const textDescription = "Does everything in the array " + JSON.stringify(testArray) + " pass the " + name + " test?";
        const spacingDiff = 90 - textDescription.length;

        const everythingResult = everythingSome(testArray, func)
        console.log(textDescription + " ".repeat(spacingDiff) +" | " + everythingResult); 

        if (everythingResult !== testArray.every(func)) {
            passesAllTests = false;
        }
    }
}

if (passesAllTests) {
    console.log("Everything Some passes all tests! ✔️✨\n")
} else {
    console.log("Everything Some has failed some tests...");
}

console.log("Testing Everything Loop...\n");

passesAllTests = true;

for (let testArray of testCases) {
    for (const [name, func] of Object.entries(testFunctionDictionary)) {
        const textDescription = "Does everything in the array " + JSON.stringify(testArray) + " pass the " + name + " test?";
        const spacingDiff = 90 - textDescription.length;

        const everythingResult = everythingLoop(testArray, func)
        console.log(textDescription + " ".repeat(spacingDiff) +" | " + everythingResult); 

        if (everythingResult !== testArray.every(func)) {
            passesAllTests = false;
        }
    }
}

if (passesAllTests) {
    console.log("Everything Loop passes all tests! ✔️✨\n")
} else {
    console.log("Everything Loop has failed some tests...");
}
