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
};

console.log("\nTesting Everything Some...\n");
testEverythingFunction(everythingSome, testCases, testFunctionDictionary);

console.log("Testing Everything Loop...\n");
testEverythingFunction(everythingLoop, testCases, testFunctionDictionary);

function testEverythingFunction(everythingFunc, testCases, testFunctionDictionary) {
    let failureStatements = [];
    
    for (let testArray of testCases) {
        for (const [name, func] of Object.entries(testFunctionDictionary)) {
            const everythingResult = everythingFunc(testArray, func)

            if (everythingResult !== testArray.every(func)) {
                failureStatements.push(`Failure #${failureStatements.length}: everything(${JSON.stringify(testArray)}, ${name}) === ${everythingResult}`);
            }
        }
    }

    if (failureStatements.length === 0) {
        console.log("Everything function passed all tests! ✔️✨\n")
    } else {
        console.log("Everything function has failed the following tests...");
        for (let statement of failureStatements) {
            console.log(statement);
        }
    }
}

//The following was used to test the tester!

// function everythingWrong(inputArray, testFunction) { 
//     for (let element of inputArray) {
//         if (!testFunction(element)) {
//             return true
//         }
//     }
//     return false;
// }

// console.log("Testing Everything Wrong...\n");
// testEverythingFunction(everythingWrong, testCases, testFunctionDictionary);
