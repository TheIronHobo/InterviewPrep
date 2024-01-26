const ROBOT_PROJECT = require('./7_1_a_robot.js');

const findRoute = ROBOT_PROJECT.findRoute;
const randoBot = ROBOT_PROJECT.randoBot;
const routeRobot = ROBOT_PROJECT.routeRobot;
const goalOrientedRobot = ROBOT_PROJECT.goalOrientedRobot;
const robotComparison = ROBOT_PROJECT.robotComparison;

function brutusBot(state,  memory = {route: [], relevantLocations: []}) {
    let bestRoute;

    if (memory.relevantLocations.length === 0) { //I think we cant turn this into one big callback function with filter and mapping
        for ({place, address} of state.parcels) {
            if (!memory.relevantLocations.includes(place)) {
                memory.relevantLocations.push(place);
            }
            if (!memory.relevantLocations.includes(address)) {
                memory.relevantLocations.push(address);
            }
        }
    }

    if (memory.route.length === 0) {
        bruteSearch(state, history = []);
        memory.route = bestRoute;
        memory.route.slice(1);
    }

    function bruteSearch(internalState, history = [], depth = 0) { //We might be able to git rid of depth by just emasuring the history length
        history = [...history, internalState.place];
        let nextPlaces = accessibleLocations(internalState, roadGraph);

        if (bestRoute !== undefined && history.length >= bestRoute.length) {
            return;
        }
        // guess of approximate max length of shortest route
        if (depth >= roads.length * 2 + 1) { 
            return;
        }
        if (internalState.parcels.length === 0) {
            bestRoute = history;
            return;
        }
        if (history.length >= 3) {
            let currentLocation = history[history.length-1]
            let lastLocation = history[history.length-2];
            let secondToLastLocation = history[history.length-3];

            const uselesslyBacktracking = !memory.relevantLocations.includes(lastLocation) && (secondToLastLocation === currentLocation);
            if (uselesslyBacktracking) {
                return;
            }
        }

        for (let i = 0; i < nextPlaces.length; i++) {
           let newInternalState = internalState.move(nextPlaces[i]);
           bruteSearch(newInternalState, history, depth + 1);
        }
    }

    function accessibleLocations(state, graph) {
        return graph[state.place]
    }    

    return {
        direction: memory.route[0],
        memory: {route: memory.route.slice(1), relevantLocations: memory.relevantLocations}
    };
}


function pickupDropoffBot({place, parcels}, route = []) {
    if (route.length === 0) {
        unattainedParcels = parcels.filter(j => j.place !== place);
        if (unattainedParcels.length !== 0) {
            route = findRoute(roadGraph, place, unattainedParcels[0].place);
            return {direction: route[0], memory: route.slice(1)};
        }

        let parcel = parcels[0];

        if (parcel.place !== place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}


function thoughtfulPickupDropoffBot({place, parcels}, route = []) {
    if (route.length === 0) {
        let unattainedParcelPickups = parcels.filter(j => j.place !== place).map(j => j.place);
        let undeliveredParcelsDropoffs = parcels.filter(j => j.place === place).map(j => j.address);;
        
        if (unattainedParcelPickups.length !== 0) {
            route = closestParcelRoute(place, unattainedParcelPickups);
        } else if (undeliveredParcelsDropoffs.length !== 0) { //This could just be an else I think??
            route = closestParcelRoute(place, undeliveredParcelsDropoffs);
        }
    }

    function closestParcelRoute(place, parcelLocationList) {
        let possibleRoutes = [];
        
        for (parcelLocation of parcelLocationList) {
            possibleRoutes.push(findRoute(roadGraph, place, parcelLocation))
        }
      
        possibleRoutes.sort((a,b) => {
            if (a.length > b.length) {
                return 1;
            } else if(a.length < b.length) {
                return -1;
            }
            return 0;
        });

        return possibleRoutes[0];
    }

    return {direction: route[0], memory: route.slice(1)};
}

function goalOrientedButLovesHorsesRobot({place, parcels}, memory = {route: [], turnsWithoutSeeingHorse: Infinity}) {
    if(memory.route.length === 0) {
        if (place === "Farm") {
            memory.turnsWithoutSeeingHorse = 0;
        }
        if (memory.turnsWithoutSeeingHorse > 5) {
            memory.route = findRoute(roadGraph, place, "Farm");
        } else {
            let parcel = parcels[0];
            if (parcel.place != place) {
                memory.route = findRoute(roadGraph, place, parcel.place);
            } else {
                memory.route = findRoute(roadGraph, place, parcel.address);
            }
        }
    }
    return {direction: memory.route[0], memory: {route: memory.route.slice(1), turnsWithoutSeeingHorse: memory.turnsWithoutSeeingHorse++}}
}

let roboDictionary = {
    randoBot: randoBot,
    routeRobot: routeRobot,
    goalOrientedRobot: goalOrientedRobot,
    goalOrientedButLovesHorsesRobot: goalOrientedButLovesHorsesRobot,
    brutusBot: brutusBot,
}

let results = robotComparison(roboDictionary, 50);

results.sort((a,b)=>{
    if(a.averageSteps > b.averageSteps) {
        return 1;
    } else if (a.averageSteps < b.averageSteps){
        return -1;
    }
    return 0;
});
    
    
console.log(results);
