/** Performs the FizzBuzz operation up to and including iter*/
function FizzBuzz(iter) {
    if (Number.isNaN(iter)) {
        throw "FizzBuzz input is NaN"
        return;
    }
    if (iter<=0) {
        throw "FizzBuzz input is less than zero";
        return;
    }
    for (let i = 1; i <= iter; i++) {
        let output = '';
        if (i%3 === 0) {
            output += "Fizz";
        }
        if (i%5 === 0) {
            output += "Buzz";
        }
        if (!output) {
            output += i;
        }
        console.log(output);
    }
}

FizzBuzz(100);
