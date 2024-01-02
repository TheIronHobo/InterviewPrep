/**
 * Converts an array to a list data structure
 * @param {*} inputArray 
 * @param {*} list 
 * @returns 
 */
function arrayToListRecursive(inputArray, list = { value: null, rest: null }, depth = 0) { 
    if (!Array.isArray(inputArray)) { 
        throw "input must be array";
    }

    if (depth > inputArray.length) {
        return list.rest;
    }

    prependInPlace(list, inputArray[inputArray.length-depth]);

    // //list.value = inputArray.pop();
    // list.value = inputArray;
    // list.rest = structuredClone(list);

    return arrayToListRecursive(inputArray, list, depth+1);
}

/**
 * modifies the list to contain the prepended element
 * @param {*} inputList 
 * @param {*} element 
 * @returns 
 */
function prependInPlace(inputList, element) {
    if (!isList(inputList)) {
        throw "input must be list data structure";
    }
    let listTemplate = { value: null, rest: null };
    listTemplate.rest = inputList;
    listTemplate.value = element;
    inputList = listTemplate;
}


function huskListInPlace(input) {

}

function isList(inputList) {
    if (!Object.keys(inputList).includes('value') || !Object.keys(inputList).includes('rest')) {
        return false;
    }
    return true;
}



/**
 * Converts a list data structure to an array
 * @param {*} inputList 
 * @param {*} arrayAccumulator 
 * @returns 
 */
function listToArrayRecursive(inputList, arrayAccumulator = []) {
    if (!isList(inputList)) {
        throw "input must be list data structure";
    }
    
    arrayAccumulator.push(inputList.value);

    if (inputList.rest) {
        listToArrayRecursive(inputList.rest,arrayAccumulator)
    }

    return arrayAccumulator;
}

/**
 * Returns the nth element of a list
 * @param {*} inputList 
 * @param {*} targetIndex 
 * @param {*} depth 
 * @returns 
 */
function nthRecursive(inputList, targetIndex, depth = 0) {
    if (inputList === null) {
        throw "target index out of range"
    }
    if (!isList(inputList)) {
        throw "input must be list data structure";
    }
    if(depth === 0) {
        if (isNaN(targetIndex) || targetIndex < 0 || Math.abs(targetIndex) === Infinity) {
            throw "invalid target index";
        }
    }
    if (depth === targetIndex) {
        return inputList.value;
    }

    return nthRecursive(inputList.rest, targetIndex, depth + 1);
}



//-----------------------------------------------

/**
 * Converts an array  to a list data structure
 * @param {*} inputArray 
 * @param {*} list 
 * @returns 
 */
function arrayToListIterative([...inputArray], list = { value: null, rest: null }) { 
    if (!Array.isArray(inputArray)) { //this needs work
        throw "input must be array";
    }

    if (inputArray.length === 0) {
        return list.rest;
    }

    list.value = inputArray.pop();
    list.rest = structuredClone(list);

    return arrayToListIterative(inputArray, list);
}

/**
 * Converts a list data structure to an array
 * @param {*} inputList 
 * @param {*} arrayAccumulator 
 * @returns 
 */
function listToArrayIterative(inputList, arrayAccumulator = []) {
    if (!isList(inputList)) {
        throw "input must be list data structure";
    }
    
    arrayAccumulator.push(inputList.value);

    if (inputList.rest) {
        listToArrayIterative(inputList.rest,arrayAccumulator)
    }

    return arrayAccumulator;
}



/**
 * Returns the nth element of a list
 * @param {*} inputList 
 * @param {*} targetIndex 
 * @param {*} depth 
 * @returns 
 */
function nthIterative(inputList, targetIndex, depth = 0) {
    if (inputList === null) {
        throw "target index out of range"
    }
    if (!isList(inputList)) {
        throw "input must be list data structure";
    }
    if(depth === 0) {
        if (isNaN(targetIndex) || targetIndex < 0 || Math.abs(targetIndex) === Infinity) {
            throw "invalid target index";
        }
    }
    if (depth === targetIndex) {
        return inputList.value;
    }

    return nthIterative(inputList.rest, targetIndex, depth + 1);
}

// -------------------------------------------------------------------------------------------------------


console.log('\n');
let testArray = ['a', 'b', 'c'];
let testListB = { value: 'b', rest: null };
console.log("Testing prepend in place..." + JSON.stringify(prependInPlace(testListB,'a')));
console.log("testListB: " + JSON.stringify(testListB));
console.log("testArray: " + testArray);
console.log("Assigning variable testList to arrayToListRecursive(testArray)");
let testList = arrayToListRecursive(testArray);
console.log("testlist has correct structure: " + JSON.stringify(testList));
console.log("testArray was not mutated by arrayToListRecursive: " + (testArray));
console.log('\n');

// console.log("testlist has correct structure: " + JSON.stringify(testList));
// console.log("Assigning variable testArray to listToArray(testList)");
// testArray =  listToArray(testList);
// console.log("Array has correct structure: " + testArray);
// console.log("Original list was not mutated by listToArray: "+ JSON.stringify(testList));
// console.log('\n');

// console.log("Testing prepend function");
// console.log("Prepended test list: " + JSON.stringify(prepend(testList,'z')));
// console.log("testList was not mutated by prepend: " + JSON.stringify(testList));
// console.log('\n');

// console.log("Testing nth function");
// console.log("nth: " + nth(testList,0));
// console.log("nth: " + nth(testList,1));
// console.log("nth: " + nth(testList,2));
// console.log("testList was not mutated by nth: " + JSON.stringify(testList))
// console.log('\n');

// console.log("Testing listToArray guard clause: " + listToArray({ bananas: null, rest: null }));      // Error
// console.log("Testing arrayToList guard clause: " + JSON.stringify(arrayToList(65)));                 // Error
// console.log("Testing nth guard clause 1: " + nth({bananas: true, rest: null},0));                    // Error
// console.log("Testing nth guard clause 2: " + nth({value: true, rest: null},Infinity));               // Error
// console.log("Testing nth guard clause 3: " +"nth: " + nth(testList,3));                              // Error
// console.log("Testing prepend guard clause: " +"nth: " + prepend({bananas: true, rest: null},'j'));   // Error  
// console.log('\n');

//---------------------------------------------------