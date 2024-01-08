/**
 * Performs deep comparison of two types and determines equality
 * @param {*} itemA 
 * @param {*} itemB 
 * @returns 
 */
function deepEqual(itemA, itemB) {
    if(itemA === itemB) {
        return true;
    }
    if (typeof itemA !== typeof itemB) {
        return false;
    }
    if(itemA === null || itemB === null) {
        return false;
    }

    if (typeof itemA === 'object') {
        let entriesA = Object.entries(itemA);
        let entriesB = Object.entries(itemB);
        if (entriesA.length !== entriesB.length) {
            return false;
        }

        if (entriesA.length === 0) {
            throw "objects being compared have no enumerable data types";
        }

        entriesA.sort();
        entriesB.sort(); 

        for (let i = 0; i < entriesA.length; i++) {
            let keyValuePairA = entriesA[i];
            let keyValuePairB = entriesB[i];
            if (deepEqual(keyValuePairA[0], keyValuePairB[0]) === false || deepEqual(keyValuePairA[1], keyValuePairB[1]) === false) {
                return false;
            }
        }

        return true;
    }

    return false;
}

let jimFavorites    = {favoriteNumber: 3, favoriteFruit: 'apple', favoriteDog: {name: 'simon', breed: 'border collie'}, favoriteColors: ['red', 'blue']};
let janeFavorites   = {favoriteNumber: 3, favoriteFruit: 'apple', favoriteDog: {name: 'simon', breed: 'border collie'}, favoriteColors: ['red', 'blue']}; // Same as jim
let bobbyFavorites  = {favoriteFruit: 'apple', favoriteNumber: 3, favoriteDog: {name: 'simon', breed: 'border collie'}, favoriteColors: ['red', 'blue']}; // Same as jim but in different order
let isaacFavorites  = {favoriteNumber: 3, favoriteFruit: 'apple', favoriteDog: {name: 'simon', breed: 'border collie'}, favoriteColors: ['red', 'orange']};
let markFavorites   = {favoriteNumber: 3, favoriteFruit: 'apple', favoriteDog: {name: 'simon', breed: 'chihuahua'},     favoriteColors: ['red', 'blue']};
let zachFavorites   = {favoriteNumber: 3, favoriteFruit: 'apple', favoriteDog: {name: 'simon', breed: 'border collie'}, favoriteColors: ['blue', 'red']};

console.log('\n');
console.log("deepEqual(jimFavorites, jimFavorites)   | " + deepEqual(jimFavorites, jimFavorites));      // True - Same object
console.log("deepEqual(jimFavorites, janeFavorites)  | " + deepEqual(jimFavorites, janeFavorites));     // True - Same values
console.log("deepEqual(jimFavorites, bobbyFavorites) | " + deepEqual(jimFavorites, bobbyFavorites));    // True - Same values, different order
console.log("deepEqual(jimFavorites, markFavorites)  | " + deepEqual(jimFavorites, markFavorites));     // False - Different sub object values
console.log("deepEqual(jimFavorites, isaacFavorites) | " + deepEqual(jimFavorites, isaacFavorites));    // False - Different sub array values
console.log("deepEqual(jimFavorites, zachFavorites)  | " + deepEqual(jimFavorites, zachFavorites));     // False - Different sub array order
console.log('\n');

console.log("deepEqual('☕', '☕')                   | "  + deepEqual('☕', '☕')); // True - Same values
console.log("deepEqual('☕', '⭐️')                   | "  + deepEqual('☕', '⭐️')); // False - Different values
console.log("deepEqual(3, '☕')                      | "  + deepEqual(3, '☕'));     // False - Different values
console.log("deepEqual(3, '3')                       | "  + deepEqual(3, '3'));       // False - Different types
console.log('\n');

console.log("deepEqual(null, {})                     | " + deepEqual(null, {}));        // False - Null guard clause test
console.log("deepEqual({}, null)                     | " + deepEqual({}, null));        // False - Null guard clause test
console.log("deepEqual(undefined, jimFavorites)      | " + deepEqual(undefined, {}));   // False - Undefined test
console.log('\n');

console.log("deepEqual(['a','b','c'], ['a','b','c']) | " + deepEqual(['a','b','c'], ['a','b','c']) );   // True - Same values
console.log("deepEqual(['a','b','c'], ['a','c','b']) | " + deepEqual(['a','b','c'], ['a','c','b']) );   // False - Same values different order
console.log("deepEqual(['a','b','c'], ['a','5','c']) | " + deepEqual(['a','b','c'], ['a','5','c']));    // False - Different values
console.log('\n');
