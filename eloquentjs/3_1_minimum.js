function minimum(a,b) {
    if (isNaN(a) || isNaN(b)) {
        throw "Input cannot be NaN";
        return;
    }
    if (a < b) {
        return a;
    }
    if (b < a) {
        return b;
    }
    return a;
}

console.log(minimum(-5,10));
console.log(minimum(500,4.6));
console.log(minimum(1,1));
