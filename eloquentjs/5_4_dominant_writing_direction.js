const SCRIPTS = require('./bin/scripts.js');

/**
 * Returns an array of the writing directions present in a string of input text
 * @param {*} inputString 
 * @returns 
 */
function dominantWritingDirection(inputString) {
    matchingScriptGroups = countBy(inputString, j => characterScript(characterCode(j)));
    //console.log("matchingScriptGroups.name.direction: " + JSON.stringify(matchingScriptGroups));
    //if (matchingScriptGroups[0].name)
    matchingScriptGroups = matchingScriptGroups.filter(j => j.name !== null);
    writingDirectionGroups = countBy(matchingScriptGroups, j => j.name.direction);

    writingDirections = writingDirectionGroups.map(n => n.name);

    return writingDirections;
}

function characterCode(string) {
    return string.codePointAt(0);
}

// Helper function pulled from Eloquent-JS text
function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some( ([from, to]) => {
            return code >= from && code < to;
        })) {
            return script;
        }
    }
    return null;
}

// Helper function pulled from Eloquent-JS text
function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
        let name = groupName(item);
        let known = counts.findIndex(c => c.name === name);
        if (known === -1) {
            counts.push({name, count: 1});
        } else {
            counts[known].count++;
        }
    }
    return counts;
}

let testObject = {
    directions: ['ltr', 'rtl'],
    text: "ba亣gelﺏ",
}

function arrayEquality(a, b) {
    if (a == b) {
        return true;
    }
    if (a.length !== b.length) {
        return false
    }

    for (let i = 0; i < a.length; i++) {
        if(a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}

/**
 * Performs deep comparison of two inputs and determines equality
 * @param {*} itemA 
 * @param {*} itemB 
 * @returns 
 */
function deepEqual(itemA, itemB) {
    if (itemA === itemB) {
        return true;
    }
    if (typeof itemA !== typeof itemB) {
        return false;
    }
    if (itemA === null || itemB === null) {
        return false;
    }
    if (typeof itemA !== 'object') {
        return false;
    }

    let entriesA = Object.entries(itemA);
    let entriesB = Object.entries(itemB);

    if (entriesA.length !== entriesB.length) {
        return false;
    }

    entriesA.sort();
    entriesB.sort();

    for (let i = 0; i < entriesA.length; i++) {
        const keyValuePairA = entriesA[i];
        const keyValuePairB = entriesB[i];

        const keysEqual = deepEqual(keyValuePairA[0], keyValuePairB[0]);
        const valuesEqual = deepEqual(keyValuePairA[1], keyValuePairB[1])

        if (!keysEqual || !valuesEqual) {
            return false;
        }
    }

    return true;
}

function testDominantWritingDirectionFunction(dominantWritingDirection, numTests) {

    const randomIntegerInRange = (start, end) => Math.floor(Math.random() * (end - start)) + start; // Intentionally end exclusive to match unicode ranges
    const randomScript = () => SCRIPTS[Math.floor(Math.random() * SCRIPTS.length)];
    const randomCodeFromScript = (script) => randomIntegerInRange(...script.ranges[Math.floor(Math.random() * script.ranges.length)]);

    //console.log("ran" + JSON.stringify(randomScript));

    function produceTestObject() {
        let text = "";
        let writingDirections = [];

        for (let j = 0; j < 2; j++) {
            let script = SCRIPTS[Math.floor(Math.random() * SCRIPTS.length)];
            let code = randomCodeFromScript(script);
            let direction = script.direction;

            text += String.fromCharCode(code);
            
            if (!writingDirections.includes(direction)) { //this is flawed
                writingDirections.push(direction);
            }
        }

        return {
            text: text,
            writingDirections: writingDirections,
        }
    }

    for (let i = 0; i < numTests; i++) {
        testObject = produceTestObject();
        dominantWritingDirectionResult = dominantWritingDirection(testObject.text);
    
        //console.log("\ntestObject.text: " + testObject.text);

        //if (!arrayEquality(dominantWritingDirectionResult.sort(), testObject.writingDirections.sort())) {
        if (!deepEqual(dominantWritingDirectionResult.sort(), testObject.writingDirections.sort())) {
            console.log(`\n FAILURE: ${testObject.text}`);
            console.log("testObject.writingDirectons: " + JSON.stringify(testObject.writingDirections.sort()))
            console.log("result:                      " + JSON.stringify(dominantWritingDirectionResult.sort()));
            console.log('');
        }
        else {
          //  console.log("wooooo");
        process.stdout.write('.');
        }
    }

}


//console.log("Dominant Writing Direction: " + dominantWritingDirection("䙃ݏ"));

testDominantWritingDirectionFunction(dominantWritingDirection, 100);

