const {buildGraph} = require('./buildGraph');
const {NestNode} = require("./nestNode");

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

function initializeCrowNet() {
    let graphEntries = Object.entries(crowNetGraph);

    for (const [name, connections] of graphEntries) {
        crowNetNodes.push(new NestNode(name));
    }

    crowNetNodes.forEach((node) => {
            let name = node.name;
            let connectionNames = crowNetGraph[name];
            let connections = [];

            for (let name of connectionNames) {
                node.connections.push(crowNetNodes.find((node) => name === node.name));
            }
        }
    );
}

function scalpelRandomWalk() {
    let currentNode = crowNetNodes[Math.floor(Math.random()*crowNetNodes.length)];
    currentNode.addTool("scalpel", "STOLEN FROM HOSPITAL");

    console.log("Scalpel starts at " + currentNode.name);

    let walkDistance = 5;
    console.log("Starting random walk...");

    for (let i = 0; i < walkDistance; i++) {
        let randomDestination = currentNode.connections[Math.floor(Math.random()*currentNode.connections.length)];
        // console.log(`Scalpel is leaving ${currentNode.name} and going to ${randomDestination.name}...`)
        currentNode.removeTool("scalpel", randomDestination.name);
        // imagine a crow flying with a scalpel here 
        randomDestination.addTool("scalpel", currentNode.name);
        // console.log(`Log of destination we left is ${JSON.stringify((currentNode.storage.tools.find(tool => tool.name === 'scalpel')).routing)}`)
        // console.log(`Log of destination we're at is  ${JSON.stringify((randomDestination.storage.tools.find(tool => tool.name === 'scalpel')).routing)}`)
        // console.log(currentNode.storage.tools.find(tool => tool.name === 'scalpel').routing);
        currentNode = randomDestination;
    }

    console.log(`Scalpel ended up in ${currentNode.name}`);
    console.log("Random walk complete");
}

function crowNetDisplay() { //drastically update/simplify this please
    console.log("CROW NET DATA");
    console.log("__________________________");
    crowNetNodes.forEach((node) => {
     console.log("\nNode: " + node.name);
     console.log("Available Connections: ")
     node.connections.forEach((connection) => {
        process.stdout.write("  | " + connection.name + " |");
     });
     console.log("\nInventory: ");
     node.toolFlowLog.filter((entry) => entry.routing[1] === '').forEach((toolLog) => console.log("    "+ toolLog.name));
     console.log("\n_ _ _ _ _ _ _ _ _ _ _ _ _ ");
    });
    console.log("__________________________");
 }

let crowNetLocations = [];

for (let i = 0; i < crowNetConnections.length; i++) {
    crowNetLocations.push(...crowNetConnections[i].split('-'))
}

crowNetLocations = removeDuplicates(crowNetLocations);

const crowNetGraph = buildGraph(crowNetConnections);
let crowNetNodes = [];

initializeCrowNet();
scalpelRandomWalk();

module.exports = {crowNetLocations, crowNetConnections, crowNetGraph, crowNetNodes, crowNetDisplay, initializeCrowNet, scalpelRandomWalk};
