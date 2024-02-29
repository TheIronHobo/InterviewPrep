const { crowNetLocations, 
        crowNetConnections, 
        crowNetGraph, 
        crowNetNodes, 
        crowNetDisplay,
        initializeCrowNet,
        scalpelRandomWalk} = require('./crowNetData');

initializeCrowNet();
scalpelRandomWalk();
crowNetDisplay();

// need to do the async stuff here

