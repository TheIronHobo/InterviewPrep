function loop(value, testFunction, updateFunction, bodyFunction) {
    while (testFunction(value)) {
        bodyFunction(value);
        value = updateFunction(value);
    }
}

const addOne = x => x + 1;
const fireLaserCannonNTimes = n => console.log(" Pew! ".repeat(n));
const lessThanN = n => (x => x < n);
const lessThanSix = lessThanN(6);

loop(0, lessThanSix, addOne, fireLaserCannonNTimes);
