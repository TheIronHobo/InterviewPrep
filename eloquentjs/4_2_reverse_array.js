/**
 * Performs non-mutating array reversal operation
 * @param {*} input 
 * @returns 
 */
function reverseArray(input) {
    if (input.constructor.toString().indexOf("Array") === -1) {
        throw "input must be array";
    }
    if (input.length <= 0) {
        return [];
    }

    output = [];
    for (let i = input.length - 1; i >= 0; i--) {
        output.push(input[i]);
    }
    return output;
}

/**
 * Performs mutating array reversal operation
 * @param {*} input 
 * @returns 
 */
function reverseArrayInPlace(input) {
    if (input.constructor.toString().indexOf("Array") === -1) {
        throw "input must be array";
    }
    if (input.length <= 0) {
        return [];
    }

    output = [];
    while (input.length > 0) {
        output.push(input.pop());
    }
    while (output.length > 0) {
        input.push(output.shift());
    }
}

let testArray = [4,5,6];
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
