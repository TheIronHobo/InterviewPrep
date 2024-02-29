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

