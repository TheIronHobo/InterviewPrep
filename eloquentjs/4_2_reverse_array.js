/**
 * Performs non-mutating array reversal operation
 * @param {*} input 
 * @returns 
 */
function reverseArray(input) {
    if (!Array.isArray(input)) {
        throw "input must be array";
    }

    output = [];
    for (let i = 0; i < input.length; i++) {
        output.unshift(input[i]);
    }
    return output;
}

/**
 * Performs mutating array reversal operation
 * @param {*} input 
 * @returns 
 */
function reverseArrayInPlace(input) {
    if (!Array.isArray(input)) {
        throw "input must be array";
    }

    for (let i = 0; i < input.length - 1; i++) {
        input.splice(i,0,input.pop())
    }
}

let testArray = [4,5,6,7,8];
console.log("\n" + "Original array: " + testArray)
console.log("Reversed Array: " + reverseArray(testArray));
console.log("Original array is unmutated: "+ testArray);
console.log("Performing in place array reversal...");
reverseArrayInPlace(testArray);
console.log("Original array has mutated: " + testArray);

// console.log("Guard clause test 1: ");
// console.log(reverseArray(true));
// console.log("Guard clause test 2: ");
// console.log(reverseArray([]));
// console.log("Guard clause test 3: ");
// console.log(reverseArrayInPlace(true));
// console.log("Guard clause test 4: ");
// console.log(reverseArrayInPlace([]));
