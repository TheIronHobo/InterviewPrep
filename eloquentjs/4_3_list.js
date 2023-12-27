/**
 * Converts an array to a list data structure
 * @param {*} inputArray 
 * @param {*} list 
 * @returns 
 */
function arrayToList([...inputArray], list = { value: null, rest: null }) { 
    if (inputArray.constructor.toString().indexOf("Array") === -1) {
        throw "input must be array";
    }

    if (inputArray.length === 0) {
        return list.rest;
    }

    list.value = inputArray.pop();
    list.rest = structuredClone(list);

    return arrayToList(inputArray, list);
}

/**
 * Converts a list data structure to an array
 * @param {*} inputList 
 * @param {*} arrayAccumulator 
 * @returns 
 */
function listToArray(inputList, arrayAccumulator = []) {
    arrayAccumulator.push(inputList.value);

    if (inputList.rest) {
        listToArray(inputList.rest,arrayAccumulator)
    }

    return arrayAccumulator;
}

/**
 * Returns a version of the list with a prepended element
 * @param {*} inputList 
 * @param {*} element 
 * @returns 
 */
function prepend(inputList, element) {
    return {
        value: element,
        rest: inputList
    }
}

/**
 * Returns the nth element of an array
 * @param {*} inputList 
 * @param {*} targetIndex 
 * @param {*} depth 
 * @returns 
 */
function nth(inputList, targetIndex, depth = 0) {
    if (inputList === null) {
        throw "target index out of range"
    }

    if (depth === targetIndex) {
        return inputList.value;
    }

    return nth(inputList.rest, targetIndex, depth+1);
}

let testArray = ['a', 'b', 'c'];
let testList = arrayToList(testArray);
console.log("Test Array: " + JSON.stringify(testArray));
console.log("Test list: " + JSON.stringify(testList));

console.log("List to array: " + listToArray(testList));
console.log("Test list: " + JSON.stringify(testList));
testList = prepend(testList,'z');
console.log("Prepended test list: " + JSON.stringify(testList));
console.log("nth: " + nth(testList,0));
console.log("nth: " + nth(testList,1));
console.log("nth: " + nth(testList,2));
console.log("nth: " + nth(testList,3));
// console.log("nth: " + nth(testList,4)); //Error
