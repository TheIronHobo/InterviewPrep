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

    const maxIndex = inputArray.length - 1;

    function innerArrayToList(currentIndex, list = null) {
        if (currentIndex < 0) {
            return list;
        }

        const arrayElement = inputArray[currentIndex];

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

    function innerListToArray(list, arrayAccumulator = []) {
        if(list.value !== null) {
            arrayAccumulator.push(list.value);
        }

        if (list.rest === null) {
            return arrayAccumulator;
        } else {
            return innerListToArray(list.rest, arrayAccumulator);
        }
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

    let acc = [];

    let listBuffer = inputList;
    while (listBuffer !== null) {
        acc.push(listBuffer.value)
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
    if (targetIndex > getListLength(inputList) - 1) {
        throw "invalid target index";
    }

    listBuffer = inputList;
    for (let i = 0; i < targetIndex; i++) {
        listBuffer = listBuffer.rest;
    }

    return listBuffer.value;
}

/**
 * Returns true if input data structure is list
 * @param {*} inputList 
 * @returns 
 */
function isList(inputList) {
    const keys = Object.keys(inputList);
    return (keys.includes('value')) && (keys.includes('rest')) && (keys.length === 2);
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

    function innerListLength(list, listLength = 0) {
        if (list.value !== null) {
            listLength++;
        }
        if (!list.rest) {
            return listLength;
        }
        return innerListLength(list.rest, listLength);
    }

    return innerListLength(inputList);
}

let testArray = ['a', 'b', 'c'];
let testList = {value:"a", rest:{value:"b", rest:{value:"c", rest:null}}};

let emptyArray = [];
let emptyList = {value: null, rest: null};

console.log('\n');
console.log("Test List: " + JSON.stringify(testList));
console.log("Test Array: " + JSON.stringify(testArray));
console.log('\n');
console.log("Standard Testing");
console.log("Recursion| testArray to list: "    +   JSON.stringify(arrayToList(testArray)));
console.log("Iteration| testArray to list: "    +   JSON.stringify(arrayToListIterative(testArray)));
console.log("Recursion| testList to array: "     +   JSON.stringify(listToArray(testList)));
console.log("Iteration| testList to array: "     +   JSON.stringify(listToArrayIterative(testList)));
console.log('\n');
console.log("Empty/Null Testing");
console.log("Recursion| emptyArray to list: "    +   JSON.stringify(arrayToList(emptyArray)));
console.log("Iteration| emptyArray to list: "    +   JSON.stringify(arrayToListIterative(emptyArray)));
console.log(`Recursion| emptyList to array: `     +   JSON.stringify(listToArray(emptyList)));
console.log(`Iteration| emptyList to array: `     +   JSON.stringify(listToArrayIterative(emptyList)));
console.log('\n');
console.log("Helper Function Testing");
console.log(`testList with prepended element '☕' `    +   JSON.stringify(prepend(testList, '☕')));
console.log(`Returning index 2 element from testList: `+   nth(testList,2));
console.log("Get testList Length "+ getListLength(testList));
console.log("Is testList a list? " + isList(testList));
console.log(`Is 'mayonnaise' a list? ` + isList('mayonnaise'));
// console.log("Attempting to retrieve out of bounds element from testList... " + (nth(testList,3))); //Error
