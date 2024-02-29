const {NestNode} = require("./nestNode");
const {crowNetLocations, crowNetConnections, crowNetGraph} = require('./crowNetData');

let crowNetNodes = [];

function initializeCrowNet() {
    let graphEntries = Object.entries(crowNetGraph);

    for (const [name, connections] of graphEntries) {
        crowNetNodes.push(new NestNode(name));
    }

    console.log(crowNetNodes);

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
    let startingNode = crowNetNodes[Math.floor(Math.random()*crowNetNodes.length)];
    startingNode.toolFlowLog.push(

    );
    let walkDistance = 1000;

    for (let i = 0; i < walkDistance; i++) {

    }

}

initializeCrowNet();
crowNetDisplay();

function crowNetDisplay() {
    console.log("CROW NET DATA");
    console.log("__________________________");
    crowNetNodes.forEach((node) => {
     console.log("\nNode: " + node.name);
     console.log("Available Connections: ")
     node.connections.forEach((connection) => {
        process.stdout.write("| " + connection.name + " |");
     })
     console.log("\n_ _ _ _ _ _ _ _ _ _ _ _ _ ");
    });
    console.log("__________________________");
 }