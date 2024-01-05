function deepEqual(itemA, itemB) {
    if(itemA === null && itemB === null) {
        return true;
    }
    if (typeof itemA === typeof itemB) {
        if (typeof itemA === 'object') {
            if(itemA === null || itemB === null) {
                return false;
            }

            let keysA = Object.entries(itemA);
            let keysB = Object.entries(itemB);

            if (keysA.length !== keysB.length) {
                return false;
            }

            if (keysA.length === 0) {
                throw "objects being compared have no enumerable data types";
            }
            
            for (let i = 0; i < keysA.length; i++) {
                let keyValuePairA = keysA[i];
                let keyValuePairB = keysB[i];
                if (deepEqual(keyValuePairA[0], keyValuePairB[0]) === false || deepEqual(keyValuePairA[1], keyValuePairB[1]) === false ) {
                    return false;
                }
            }

            return true;
        } else {
            return (itemA === itemB) ? true : false;
        }
    }
    else { 
        return false;
    }
}

let jimFavorites    = {favoriteNumber: 3, favoriteFruit: 'apple', favoriteDog: {name: 'simon', breed: 'border collie'}, favoriteColors: ['red', 'blue']};
let janeFavorites   = {favoriteNumber: 3, favoriteFruit: 'apple', favoriteDog: {name: 'simon', breed: 'border collie'}, favoriteColors: ['red', 'blue']};
let isaacFavorites  = {favoriteNumber: 3, favoriteFruit: 'apple', favoriteDog: {name: 'simon', breed: 'border collie'}, favoriteColors: ['red', 'orange']};
let markFavorites   = {favoriteNumber: 3, favoriteFruit: 'apple', favoriteDog: {name: 'simon', breed: 'chihuahua'},     favoriteColors: ['red', 'blue']};

console.log('\n');

console.log("deepEqual(jimFavorites, jimFavorites)   | " + deepEqual(jimFavorites, jimFavorites));
console.log("deepEqual(jimFavorites, janeFavorites)  | " + deepEqual(jimFavorites, janeFavorites));
console.log("deepEqual(jimFavorites, markFavorites)  | " + deepEqual(jimFavorites, markFavorites));
console.log("deepEqual(jimFavorites, isaacFavorites) | " + deepEqual(jimFavorites, isaacFavorites));
console.log('\n');

console.log("deepEqual('☕', '☕')                   | "  + deepEqual('☕', '☕'));
console.log("deepEqual('☕', '⭐️')                   | "  + deepEqual('☕', '⭐️'));
console.log("deepEqual(3, '☕')                      | "  + deepEqual(3, '☕'));
console.log("deepEqual(3, '3')                       | "  + deepEqual(3, '3'));
console.log('\n');

console.log("deepEqual(null, jimFavorites)           | " + deepEqual(null, jimFavorites));
console.log("deepEqual(undefined, jimFavorites)      | " + deepEqual(undefined, jimFavorites));
console.log('\n');

console.log("deepEqual(['a','b','c'], ['a','b','c']) | " + deepEqual(['a','b','c'], ['a','b','c']) );
console.log("deepEqual(['a','b','c'], ['a','5','c']) | " + deepEqual(['a','b','c'], ['a','5','c']));
console.log('\n');
