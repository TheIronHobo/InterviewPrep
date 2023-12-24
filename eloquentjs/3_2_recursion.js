/**Tests if input digit is even and returns boolean*/
function isEven(input) {
    if (isNaN(input)) {
        throw "isEven input cannot be NaN";
        return;
    }
    if (!Number.isInteger(input)) {
        throw "isEven input must be an integer";
        return;
    }
    if (input < 0) {
        input *= -1;
    }
    if (input == 1) {
        return false;
    }
    if (input == 0) {
        return true;
    }
    return(isEven(input-2));
}

let testSpan = 10;

for (let i = -testSpan; i <= testSpan; i++) {
    console.log(i+': ' + isEven(i));
}
