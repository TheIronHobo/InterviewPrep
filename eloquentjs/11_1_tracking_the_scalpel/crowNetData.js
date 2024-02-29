const {buildGraph} = require('./buildGraph');

const crowNetConnections = [
    "Church Tower-Sportsgrounds", "Church Tower-Big Maple",
    "Sportsgrounds-Tall Poplar", "Sportsgrounds-Big Maple",
    "Big Maple-Woods", "Woods-Fabienne's Garden",
    "Big Maple-Fabienne's Garden", "Fabienne's Garden-Cow Pasture",
    "Cow Pasture-Big Oak", "Tall Poplar-Chateau",
    "Tall Poplar-Butcher's Shop", "Chateau-Butcher's Shop",
    "Chateau-Great Pine", "Great Pine-Jaques' Farm",
    "Jaques' Farm-Hawthorn", "Hawthorn-Great Pine",
    "Hawthorn-Giles' Garden", "Great Pine-Giles' Garden",
    "Giles' Garden-Butcher's Shop", "Giles' Garden-Big Oak",
    "Butcher's Shop-Big Oak"
];

const removeDuplicates = ([...array]) => {
    array.sort();

    for (let i = 0; i < array.length - 1; ) {
        if (array[i] === array[i + 1]) {
            array.splice(i + 1, 1);
        } else {
            i++;
        }   
    }

    return array;
}

let crowNetLocations = [];

for (let i = 0; i < crowNetConnections.length; i++) {
    crowNetLocations.push(...crowNetConnections[i].split('-'))
}

crowNetLocations = removeDuplicates(crowNetLocations);

const crowNetGraph = buildGraph(crowNetConnections);

module.exports = {crowNetLocations, crowNetConnections, crowNetGraph};
