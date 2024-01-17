const SCRIPTS = require('./bin/scripts.js');

/**
 * Returns an array of the writing directions present in a string of input text
 * @param {*} inputString 
 * @returns 
 */
function dominantWritingDirection(inputString) {
    matchingScriptGroups = countBy(inputString, j => characterScript(characterCode(j)));

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

console.log(dominantWritingDirection("ba亣gelﺏ"));


// I should build a function that generates a random number somewhere in the entire unicode range
// We build a list of objects that contain the random string and the correlating languages
//we use a more ineffecient method to verify the veracity of the unicode characters?

//get random sampling of different objects