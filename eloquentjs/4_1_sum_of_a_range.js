/**
 * Returns the range of numbers from between start-end by incrementing by the value of step
 * The sign of step is not taken into account, just the absolute value
 * If only two parameters are provided the function defaults to a step size of 1
 * If the end paramater is smaller than the start paramater the function assumes a negative step iteration
 * @param {*} a 
 * @param {*} b 
 * @param {*} step 
 * @returns 
 */
function range(start, end, step = 1) {
    if (end === undefined) {
        throw "invalid input";
    }
    if (isNaN(start) || isNaN(end) || isNaN(step)) {
        throw "invalid input";
    }
    if ((Math.abs(start) === Infinity) || (Math.abs(end) === Infinity) || (Math.abs(step) === Infinity)) {
        throw "invalid input";
    }
    if (step === 0) {
        throw "step cannot be zero";
    }

    step = Math.abs(step);
    let reverse = (end < start) ? -1 : 1;

    output = [];
    for (let i = start; (i*reverse) <= (reverse*end); i += (reverse*step)) {
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

console.log(sum(range(1, 5)));   
console.log((range(1, 5)));      
console.log((range(5, 1)));       


console.log('\n');
console.log(sum(range(-1, 4)));   
console.log((range(-1, 4)));     
console.log((range(4, -1)));       
console.log((range(-1, 4 ,-1)));   
console.log('\n');

console.log((range(1, 5, 2)));
console.log((range(1, 5, -2)));     
console.log('\n');

console.log((range(7, 9, 0.5)));        // [ 7, 7.5, 8, 8.5, 9 ]
console.log((range(9, 7, -0.5)));       // [ 9, 8.5, 8, 7.5, 7 ]
console.log('\n');

console.log((range(2, 5, 1)));          // [ 2, 3, 5, 5 ]
console.log((range(5, 2, 1)));          // [ 2, 3, 5, 5 ]
console.log((range(2, 5, -1)));         // [ 5, 5, 3, 2 ] 
console.log((range(5, 2, -1)));         // [ 5, 5, 3, 2 ] 
console.log('\n');

// console.log(sum(range('more cowbell',9)));  // Error
// console.log(sum(range(9,'more cowbell')));  // Error
// console.log((range(5, 2, 0)));              // Error
//console.log(sum(range(5)));                   // Invalid Input