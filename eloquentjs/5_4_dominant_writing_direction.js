const SCRIPTS = require('./bin/scripts.js');

/**
 * Returns an array of the writing directions present in a string of input text
 * @param {*} inputString 
 * @returns 
 */
function dominantWritingDirection(input) {
    let directionGroups = countBy(input, j => {
        return characterScript(codeFromCharacter(j)).direction;//should we compress the character script and code from character into a single function?
    });

    directionGroups.sort((a, b) => {
        if (a.count < b.count || a.name === null) {
            return 1;
        }
        if (a.count > b.count || b.name === null) {
            return -1;
        }
        return 0;
    });

    return directionGroups[0].name;
}

/**
 * Returns the script that corresponds to an input character code
 * @param {*} code 
 * @returns 
 */
function scriptFromCharacter(input) {
    const code = input.codePointAt(0);
    for (let script of SCRIPTS) {
        if (script.ranges.some( ([from, to]) => {
            return code >= from && code < to;
        })) {
            return script;
        }
    }
    console.log("NULL DETECTED: " + code)
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
    let mongolian = "᠓ᢄ᠐ᡁᡁ" + String.fromCharCode(1212498701208712380712308);
    
    let tests = [
        [latin, 'ltr'],
        [arabic, 'rtl'],
        [mongolian, 'ttb'],
        [latin + latin + arabic, 'ltr'],
        [latin + arabic + arabic, 'rtl'],
        [arabic + mongolian + mongolian, 'ttb']
    ];

    for (test of tests) {
        if (dominantWritingDirection(test[0]) !== test[1]) {
            console.log(`FAILURE: ${test[0]} | (${dominantWritingDirection(test[0])} !== ${test[1]})`);
        } else {
            process.stdout.write('.');
        }
    }

    console.log("\nTest complete");
}

testDominantWritingDirectionFunction(dominantWritingDirection);
