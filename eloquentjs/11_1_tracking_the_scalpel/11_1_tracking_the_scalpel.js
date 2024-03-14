const { crowNetLocations, 
        crowNetConnections, 
        crowNetGraph, 
        crowNetNodes, 
        crowNetDisplay,
        initializeCrowNet,
        scalpelRandomWalk } = require('./crow-tech');
const { findRoute } = require('./findRoute');

const { requestType, requestTypes } = require('./request');

let bigOak = crowNetNodes.find((node) => node.name === "Big Oak");
let butchersShop = crowNetNodes.find((node) => node.name === "Butcher's Shop");

//bigOak.display();
//bigOak.send("Hawthorn", "note", "Let's caw loudly at 7PM", () => console.log("Note delivered."));


//console.log(crowNetGraph);
//console.log("Looking for scalpel in storage");
//findInStorage(bigOak, "tools", "scalpel").then(value => console.log("Got", value));
