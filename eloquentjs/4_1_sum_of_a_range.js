/**
 * Returns the range of numbers from between a-b by incrementing by the value of step
 * If the sign of step is positive it returns an array ranging from the lesser(inclusive) to the greater
 * If the sign of step is negative is returns an array ranging from the greater(inclusive) to the lesser
 * If only two parameters are provided the function defaults to a step size of 1
 * If only a single parameter is provided the function will return the range between 0 and the first parameter at a step size of 1
 * @param {*} a 
 * @param {*} b 
 * @param {*} step 
 * @returns 
 */
function range(a, b, step = 1) {
    if (b === undefined) {
        b = a;
        a = 0;
    }
    if (isNaN(a) || isNaN(b) || isNaN(step)) {
        throw "invalid input";
    }
    if (step === 0) {
        throw "step cannot be zero";
    }
    
    let stepSign = Math.sign(step);

    if ((b * stepSign) < (a * stepSign)) {
        let swapBuff;
        swapBuff = a;
        a = b;
        b = swapBuff;
    }

    output = [];
    for (let i = a; (i * stepSign) <= (b * stepSign); i += step) {
        output.push(i);
    }

    return output;
}


function sum(input) {
    let total = 0;
    for (let i = 0; i < input.length; i++) {
        total += input[i];
    }

    if (isNaN(total)) {
        throw "invalid input";
    }

    return total;
}

console.log(sum(range(1, 10)));         // 55
console.log(sum(range(10, 1)));         // 55
console.log(sum(range(10)));            // 55

console.log('\n');
console.log(sum(range(-1, 10)));        // 54
console.log(sum(range(10, -1)));        // 54
console.log(sum(range(-1, 10)));        // 54
console.log(sum(range(-1, 10 ,-1)));    // 54
console.log('\n');

console.log((range(1, 10, 2)));         // [ 1, 3, 5, 7, 9 ]
console.log((range(1, 10, -2)));        // [ 10, 8, 6, 4, 2 ]
console.log('\n');

console.log((range(7, 9, 0.5)));        // [ 7, 7.5, 8, 8.5, 9 ]
console.log((range(9, 7, -0.5)));       // [ 9, 8.5, 8, 7.5, 7 ]
console.log('\n');

console.log((range(2, 5, 1)));          // [ 2, 3, 4, 5 ]
console.log((range(5, 2, 1)));          // [ 2, 3, 4, 5 ]
console.log((range(2, 5, -1)));         // [ 5, 4, 3, 2 ] 
console.log((range(5, 2, -1)));         // [ 5, 4, 3, 2 ] 
console.log('\n');

// console.log(sum(range('more cowbell',9)));  //Error
// console.log(sum(range(9,'more cowbell')));  //Error
// console.log((range(5, 2, 0)));              //Error
