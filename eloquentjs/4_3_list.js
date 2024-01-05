function arrayToList(inputArray) { 
    if (!Array.isArray(inputArray)) { 
        throw "input must be array";
    }

    let currentIndex = inputArray.length-1;

    function innerArrayToList(inputArray, list = null) {
        if (currentIndex < 0) {
            return list;
        }
        let arrayVal = inputArray[currentIndex];
        currentIndex--;
        return innerArrayToList(inputArray, { value: arrayVal, rest: list});
    }

    return innerArrayToList(inputArray);
}

function arrayToListIterative(inputArray) { 
    let listAcc = null;

    for (let i = inputArray.length-1; i >= 0; i--) {
        let element = inputArray[i];
        listAcc = {
            value: element,
            rest:listAcc
        };
    }

    return listAcc;
}

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
    }

    innerListToArray(inputList);
    return arrayAccumulator;
}

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

function prepend(inputList, element) {
    if (!isList(inputList)) {
        throw "input must be list data structure";
    }
    

    return {
        value: element,
        rest: inputList
    }
}

function nth(inputList, targetIndex) {
    if (!isList(inputList)) {
        throw "input must be list data structure";
    }
    if (isNaN(targetIndex) || targetIndex < 0 || Math.abs(targetIndex) === Infinity) {
        throw "invalid target index";
    }
    
    let currentIndex = 0;

    function innerNth(list) {

        if (list === null) {
            throw "target index out of range"
        }

        if (currentIndex === targetIndex) {
            return list.value;
        }
        else {
            currentIndex++;
            return innerNth(list.rest);
        }
    }

    return innerNth(inputList)
}

function isList(inputList) {
    if (!Object.keys(inputList).includes('value') || !Object.keys(inputList).includes('rest')) {
        return false;
    }
    return true;
}

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
let testList = {value:"a",rest:{value:"b",rest:{value:"c",rest:null}}};

console.log("Recursion| Producing list from testArray: "    +   JSON.stringify(arrayToList(testArray)));
console.log("Iteration| Producing list from testArray: "    +   JSON.stringify(arrayToListIterative(testArray)));
console.log(`Recursion| Converting testList to array: `     +   JSON.stringify(listToArray(testList)));
console.log(`Iteration| Converting testList to array: `     +   JSON.stringify(listToArrayIterative(testList)));
console.log(`Producing list with prepended element 'z' `    +   JSON.stringify(prepend(testList,'z')));
console.log(`Returning index 2 element from list testList: `+   nth(testList,2));
console.log("Get List Length "+ getListLength(testList));
console.log("Is testList a list? " + isList(testList));
console.log("Is mayonnaise a list? " + isList('mayonnaise'));
