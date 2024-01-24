class Lemur {
    constructor(name, furType) {
        this.name = name;
        this.fur = furType;
    }
}

let mikey = new Lemur("Michael", "soft");

mikey.weight = 5000;

console.log(mikey.hasOwnProperty("weight")); // true

mikey.hasOwnProperty = 'I peddle pristine properties';

const hasOwnPropertySymbol = Symbol("hasOwnProperty");
Lemur.prototype[hasOwnPropertySymbol] = Object.prototype.hasOwnProperty;

console.log(mikey[hasOwnPropertySymbol]("weight")); // true
console.log(mikey[hasOwnPropertySymbol]("morals")); // false

let map = {one: true, two: true, hasOwnProperty: true};


Object.prototype[hasOwnPropertySymbol] = Object.hasOwnProperty;
console.log(map[hasOwnPropertySymbol]("one")); // true
