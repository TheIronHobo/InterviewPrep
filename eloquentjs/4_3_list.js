/**
 * Returns list from array
 * @param {*} inputArray 
 * @returns 
 */
function arrayToList(inputArray) { 
    if (!Array.isArray(inputArray)) { 
        throw "input must be array";
    }

    let currentIndex = inputArray.length-1;

    function innerArrayToList(inputArray, list = null) {
        if (currentIndex < 0) {
            return list;
        }

        let arrayElement = inputArray[currentIndex];
        currentIndex--;
        return innerArrayToList(inputArray, { value: arrayElement, rest: list});
    }

    return innerArrayToList(inputArray);
}

/**
 * Returns list from array
 * @param {*} inputArray 
 * @returns 
 */
function arrayToListIterative(inputArray) {
    if (!Array.isArray(inputArray)) { 
        throw "input must be array";
    }

    let listAcc = null;

    for (let i = inputArray.length - 1; i >= 0; i--) {
        let element = inputArray[i];
        listAcc = {
            value: element,
            rest:listAcc
        };
    }

    return listAcc;
}

/**
 * Returns array from list
 * @param {*} inputList 
 * @returns 
 */
function listToArray(inputList) {
    if (!isList(inputList)) {
        throw "input must be list data structure";
    }
    
    let arrayAccumulator = [];

    function innerListToArray(list) {
        arrayAccumulator.push(list.value);
        if (list.rest) {
            innerListToArray(list.rest)
        }
        return arrayAccumulator;
    }

    return innerListToArray(inputList);
}

/**
 * Returns array from list
 * @param {*} inputList 
 * @returns 
 */
function listToArrayIterative(inputList) {
    if (!isList(inputList)) {
        throw "input must be list data structure";
    }

    let listLength = getListLength(inputList);
    
    let acc = [];
    let listBuffer = inputList;
    for (let i = 0; i < listLength; i++) {
        if(listBuffer.value !== null) {
            acc.push(listBuffer.value);
        }
        listBuffer = listBuffer.rest;
    }

    return acc;
}

/**
 * Returns list from input list with prepended element
 * @param {*} inputList 
 * @param {*} element 
 * @returns 
 */
function prepend(inputList, element) {
    if (!isList(inputList)) {
        throw "input must be list data structure";
    }
    
    return {
        value: element,
        rest: inputList
    }
}

/**
 * Returns nth element in list
 * @param {*} inputList 
 * @param {*} targetIndex 
 * @returns 
 */
function nth(inputList, targetIndex) {
    if (!isList(inputList)) {
        throw "input must be list data structure";
    }
    if (isNaN(targetIndex) || targetIndex < 0 || Math.abs(targetIndex) === Infinity) {
        throw "invalid target index";
    }

    listBuffer = inputList;
    for (let i = 0; i < targetIndex; i++) {
        listBuffer = listBuffer.rest;
    }

    if (listBuffer === null) {
        throw "targetIndex out or range";
    }

    return listBuffer.value;
}

/**
 * Returns true if input data structure is list
 * @param {*} inputList 
 * @returns 
 */
function isList(inputList) {
    if (!Object.keys(inputList).includes('value') || !Object.keys(inputList).includes('rest') || Object.keys(inputList).length !== 2) {
        return false;
    }
    return true;
}

/**
 * Returns length of list
 * @param {*} inputList 
 * @returns 
 */
function getListLength(inputList) {
    if (!isList(inputList)) {
        throw "input must be list data structure";
    }

    let listLength = 0;
    function innerListLength(list) {
        if(list.value !== null) {
            listLength++;
        }
        if(!list.rest) {
            return listLength;
        }
        return innerListLength(list.rest);
    }

    return innerListLength(inputList);
}

let testArray = ['a', 'b', 'c'];
let testList = {value:"a", rest:{value:"b", rest:{value:"c", rest:null}}};

console.log("Recursion| Producing list from testArray: "    +   JSON.stringify(arrayToList(testArray)));
console.log("Iteration| Producing list from testArray: "    +   JSON.stringify(arrayToListIterative(testArray)));
console.log(`Recursion| Converting testList to array: `     +   JSON.stringify(listToArray(testList)));
console.log(`Iteration| Converting testList to array: `     +   JSON.stringify(listToArrayIterative(testList)));
console.log(`Producing list with prepended element '☕' `    +   JSON.stringify(prepend(testList, '☕')));
console.log(`Returning index 2 element from list testList: `+   nth(testList,2));
console.log("Get List Length "+ getListLength(testList));
console.log("Is testList a list? " + isList(testList));
console.log("Is mayonnaise a list? " + isList('mayonnaise'));
// console.log("Attempting to retrieve out of bounds element from testList... " + (nth(testList,3))); Error
