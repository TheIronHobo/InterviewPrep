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

module.exports = {deepEqual};