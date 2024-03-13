const { crowNetLocations, 
        crowNetConnections, 
        crowNetGraph, 
        crowNetNodes, 
        crowNetDisplay,
        initializeCrowNet,
        scalpelRandomWalk } = require('./crow-tech');

//crowNetDisplay();
let bigOak = crowNetNodes.find((node) => node.name === "Big Oak");
let butchersShop = crowNetNodes.find((node) => node.name === "Butcher's Shop");
// console.log(bigOak.name);
// console.log(butchersShop.name);
bigOak.display();

// need to do the async stuff here

