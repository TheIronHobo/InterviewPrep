function loop(value, testFunction, updateFunction, bodyFunction) {
    while (testFunction(value)) {
        bodyFunction(value);
        value = updateFunction(value);
    }
}

const addN = n => (x => x + n);
const lessThanN = n => (x => x < n);
const fireLaserCannonNTimes = n => console.log(" Pew! ".repeat(n));

const addOne = addN(1);
const lessThanSix = lessThanN(6);

loop(0, lessThanSix, addOne, fireLaserCannonNTimes);
