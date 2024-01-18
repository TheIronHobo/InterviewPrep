const SCRIPTS = require('./bin/scripts.js');

/**
 * Returns an array of the writing directions present in a string of input text
 * @param {*} inputString 
 * @returns 
 */
function dominantWritingDirection(input) {
    let matchingScriptGroups = countBy(input, j => characterScript(characterCode(j)));
    
    matchingScriptGroups = matchingScriptGroups.filter(j => j.name !== null);

    const writingDirectionGroups = countBy(matchingScriptGroups, j => j.name.direction);

    const writingDirections = writingDirectionGroups.map(n => n.name);

    return writingDirections;
}


/**
 * Returns the character code of input character
 * @param {*} input 
 * @returns 
 */
function characterCode(input) {
    return input.codePointAt(0);
}

/**
 * Returns the script that corresponds to an input character code
 * Helper function pulled from eloquent JS chapter 5
 * @param {*} code 
 * @returns 
 */
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

/**
 * Moves through an iterable input and creates array of objects that name and count input items according to groupName
 * Helper function pulled from eloquent JS chapter 5
 * @param {*} items 
 * @param {*} groupName 
 * @returns 
 */
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

/**
 * Returns true if two arrays are the same or share identical contents
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
function arrayEquality(a, b) {
    if(!Array.isArray(a) || !Array.isArray(b)) {
        throw "both inputs must be of type array";
    }

    if (a === b) {
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

function testDominantWritingDirectionFunction(dominantWritingDirection) {    
    console.log("\nTest commencing");

    let latin = "meow";
    let arabic = "مياو";
    let mongolian = "᠓ᢄᡸᡁᡁ";
    
    let tests = [
        [latin, ['ltr']],
        [arabic, ['rtl']],
        [mongolian, ['ttb']],
        [latin + arabic, ['ltr', 'rtl']],
        [latin + mongolian, ['ltr', 'ttb']],
        [arabic + mongolian, ['rtl', 'ttb']],
        [latin + arabic + mongolian, ['ltr', 'rtl', 'ttb']]
    ];

    for (test of tests) {
        if (!arrayEquality(dominantWritingDirection(test[0]).sort(), test[1].sort())) {
            console.log(`FAILURE: ${test[0]} | (${dominantWritingDirection(test[0])} !== ${test[1]})`);
        } else {
            process.stdout.write('.');
        }
    }

    console.log("\nTest complete");
}

testDominantWritingDirectionFunction(dominantWritingDirection);
