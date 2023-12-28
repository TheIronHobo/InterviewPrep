/**
 * Converts an array or string to a list data structure
 * @param {*} inputArray 
 * @param {*} list 
 * @returns 
 */
function arrayToList([...inputArray], list = { value: null, rest: null }) { 
    if (inputArray.constructor.toString().indexOf("Array") === -1) { //this needs work
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

    if ( !Object.keys(inputList).includes('value') || !Object.keys(inputList).includes('rest')) {
        throw "input must be list data structure";
    }
    
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
    if ( !Object.keys(inputList).includes('value') || !Object.keys(inputList).includes('rest')) {
        throw "input must be list data structure";
    }
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
    if (!Object.keys(inputList).includes('value') || !Object.keys(inputList).includes('rest')) {
        throw "input must be list data structure";
    }
    if(depth === 0) {
        if (isNaN(targetIndex) || targetIndex < 0 || Math.abs(targetIndex) === Infinity ) {
            throw "invalid target index";
        }
    }
    if (depth === targetIndex) {
        return inputList.value;
    }

    return nth(inputList.rest, targetIndex, depth+1);
}

console.log('\n');
let testArray = ['a', 'b', 'c'];
console.log("testArray: " + testArray);
console.log("Assigning variable testList to arrayToList(testArray)");
let testList = arrayToList(testArray);
console.log("testArray was not mutated by arrayToList: " + (testArray));
console.log('\n');
console.log("testlist has correct structure: " + JSON.stringify(testList));
console.log("Assigning variable testArray to listToArray(testList)");
testArray =  listToArray(testList);
console.log("Array has correct structure: " + testArray);
console.log("Original list was not mutated by listToArray: "+ JSON.stringify(testList));
console.log('\n');

console.log("Testing prepend function");
console.log("Prepended test list: " + JSON.stringify(prepend(testList,'z')));
console.log("testList was not mutated by prepend: " + JSON.stringify(testList));
console.log('\n');

console.log("Testing nth function");
console.log("nth: " + nth(testList,0));
console.log("nth: " + nth(testList,1));
console.log("nth: " + nth(testList,2));
console.log("testList was not mutated by nth: " + JSON.stringify(testList))
console.log('\n');

// console.log("Testing listToArray guard clause: " + listToArray({ bananas: null, rest: null }));  // Error
 console.log("Testing arrayToList guard clause: " + JSON.stringify(arrayToList(2024)));  // Error
// console.log("Testing nth guard clause 1: " + nth({bananas: true, rest: null},0));                  // Error
// console.log("Testing nth guard clause 2: " + nth({value: true, rest: null},Infinity));           // Error
// console.log("Testing nth guard clause 3: " +"nth: " + nth(testList,3));                                                          // Error
 //console.log("Testing prepend guard clause: " +"nth: " + prepend({bananas: true, rest: null},'j'));   
