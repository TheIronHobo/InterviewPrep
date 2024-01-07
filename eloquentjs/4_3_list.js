/**
 * Returns list from array
 * @param {*} inputArray 
 * @returns 
 */
function arrayToList(inputArray) { 
    if (!Array.isArray(inputArray)) { 
        throw "input must be array";
    }
    if (inputArray.length === 0) {
        return {value: null, rest: null};
    }

    const maxIndex = inputArray.length-1;

    function innerArrayToList(currentIndex, list = null) {
        if (currentIndex < 0) {
            return list;
        }

        let arrayElement = inputArray[currentIndex];

        return innerArrayToList(currentIndex-1, {value: arrayElement, rest: list});
    }

    return innerArrayToList(maxIndex);
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
    if (inputArray.length === 0) {
        return {value: null, rest: null};
    }

    let listAcc = null;

    for (let i = inputArray.length - 1; i >= 0; i--) {
        const element = inputArray[i];
        listAcc = {
            value: element,
            rest: listAcc
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
    if (inputList.value === null) {
        return [];
    }
    
    const arrayAccumulator = [];

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
    if (inputList.value === null) {
        return [];
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
let emptyArray = [];
let emptyList = {value: null, rest: null};

console.log('\n');
console.log("Standard Testing");
console.log("Recursion| Producing list from testArray: "    +   JSON.stringify(arrayToList(testArray)));
console.log("Iteration| Producing list from testArray: "    +   JSON.stringify(arrayToListIterative(testArray)));
console.log(`Recursion| Converting testList to array: `     +   JSON.stringify(listToArray(testList)));
console.log(`Iteration| Converting testList to array: `     +   JSON.stringify(listToArrayIterative(testList)));
console.log('\n');
console.log("Empty/Null Testing");
console.log("Recursion| Producing list from emptyArray: "    +   JSON.stringify(arrayToList(emptyArray)));
console.log("Iteration| Producing list from emptyArray: "    +   JSON.stringify(arrayToListIterative(emptyArray)));
console.log(`Recursion| Converting emptyList to array: `     +   JSON.stringify(listToArray(emptyList)));
console.log(`Iteration| Converting emptyList to array: `     +   JSON.stringify(listToArrayIterative(emptyList)));
console.log('\n');
console.log("Helper Function Testing");
console.log(`Producing list with prepended element '☕' `    +   JSON.stringify(prepend(testList, '☕')));
console.log(`Returning index 2 element from list testList: `+   nth(testList,2));
console.log("Get List Length "+ getListLength(testList));
console.log("Is testList a list? " + isList(testList));
console.log("Is mayonnaise a list? " + isList('mayonnaise'));
// console.log("Attempting to retrieve out of bounds element from testList... " + (nth(testList,3))); Error
