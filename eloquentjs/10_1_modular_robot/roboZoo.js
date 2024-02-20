const { findRoute } = require("./pathfinding");
const { roadGraph } = require("./roadGraph");
const { runRobot } = require("./runRobot");

/**
 * ----------- Book -----------
 */

function randoBot(state) {
    function randomPick(array) {
        const choice = Math.floor(Math.random() * array.length);
        return array[choice];
    }

    return {direction: randomPick(roadGraph[state.place])}
}

function routeBot(state, memory = []) {
    const mailRoute = [
        "Alice's House", "Cabin", "Alice's House", "Bob's House",
        "Town Hall", "Daria's House", "Ernie's House",
        "Grete's House", "Shop", "Grete's House", "Farm",
        "Marketplace", "Post Office"
    ];
    
    if (memory.length === 0) {
      memory = mailRoute;
    }
    
    return {direction: memory[0], memory: memory.slice(1)};
}

function goalOrientedBot({place, parcels}, route = []) {
    if (route.length === 0) {
      const parcel = parcels[0];

      if (parcel.place !== place) {
        route = findRoute(roadGraph, place, parcel.place);
      } else {
        route = findRoute(roadGraph, place, parcel.address);
      }
    }
    
    return {direction: route[0], memory: route.slice(1)};
}

/**
 * ----------- Originals -----------
 */

/**
 * First uses brute force search the find the shortest route and then follows it
 */
function brutusBot(state,  memory = {route: []}) {
    let bestRoute;
    let relevantLocations = [];
    let shortestRouteUpperBound = Infinity;

    if (memory.route.length === 0) {

        shortestRouteUpperBound = runRobot(state, thoughtfulPickupDropoffBot) + 1;

        if (relevantLocations.length === 0) { 
            for ({place, address} of state.parcels) {
                if (!relevantLocations.includes(place)) {
                    relevantLocations.push(place);
                }
                if (!relevantLocations.includes(address)) {
                    relevantLocations.push(address);
                }
            }
        }

        bruteSearch(state, history = []);
        memory.route = bestRoute;
        memory.route.slice(1);
    }

    function bruteSearch(internalState, history = []) {
        if (bestRoute !== undefined && history.length >= bestRoute.length) {
            return;
        } else if (history.length > shortestRouteUpperBound) { 
            return;
        } else if (internalState.parcels.length === 0) {
            bestRoute = [...history, internalState.place];
            return;
        } else if (history.length >= 2) {
            let currentLocation = internalState.place;
            let lastLocation = history[history.length - 1];
            let secondToLastLocation = history[history.length - 2];

            const uselesslyBacktracking = !relevantLocations.includes(lastLocation) && (secondToLastLocation === currentLocation);
            if (uselesslyBacktracking) {
                return;
            }
        }

        history = [...history, internalState.place];
        let nextPlaces = roadGraph[internalState.place];

        for (place of nextPlaces) {
            bruteSearch(internalState.move(place), history);
        }
    }

    return {
        direction: memory.route[0],
        memory: {route: memory.route.slice(1), relevantLocations: memory.relevantLocations}
    };
}

/**
 * Picks up all the mail first before beginning deliveries
 */
function pickupDropoffBot({place, parcels}, route = []) {
    if (route.length === 0) {
        let unattainedParcelPickups = parcels.filter(j => j.place !== place).map(j => j.place);
        let undeliveredParcelsDropoffs = parcels.filter(j => j.place === place).map(j => j.address);;
        
        if (unattainedParcelPickups.length !== 0) {
            route = findRoute(roadGraph, place, unattainedParcelPickups[0]);
        } else {
            route = findRoute(roadGraph, place, undeliveredParcelsDropoffs[0]);
        }
    }

    return {direction: route[0], memory: route.slice(1)};
}

/**
 * Picks up all the closest mail first before beginning closest deliveries
 */
function thoughtfulPickupDropoffBot({place, parcels}, route = []) {
    if (route.length === 0) {
        let unattainedParcelPickups = parcels.filter(j => j.place !== place).map(j => j.place);
        let undeliveredParcelsDropoffs = parcels.filter(j => j.place === place).map(j => j.address);;
        
        if (unattainedParcelPickups.length !== 0) {
            route = shortestRouteFromLocations(place, unattainedParcelPickups);
        } else  {
            route = shortestRouteFromLocations(place, undeliveredParcelsDropoffs);
        }
    }

    function shortestRouteFromLocations(place, parcelLocationList) {
        let possibleRoutes = [];
        
        for (parcelLocation of parcelLocationList) {
            possibleRoutes.push(findRoute(roadGraph, place, parcelLocation))
        }
      
        possibleRoutes.sort((a, b) => {
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

/**
 * Prioritizes doing the closest available action (pickup or delivery)
 */
function closestActionBot({place, parcels}, route = []) {
    if (route.length === 0) {
        let testArray = []

        let unattainedParcelPickups = parcels.filter(j => j.place !== place).map(j => j.place);
        let undeliveredParcelsDropoffs = parcels.filter(j => j.place === place).map(j => j.address);;
        
        let placesWithAvailableAction = [...unattainedParcelPickups, ...undeliveredParcelsDropoffs]; 

        route = shortestRouteFromLocations(place, placesWithAvailableAction);
    }

    function shortestRouteFromLocations(place, parcelLocationList) {
        let possibleRoutes = [];
        
        for (parcelLocation of parcelLocationList) {
            possibleRoutes.push(findRoute(roadGraph, place, parcelLocation))
        }
      
        possibleRoutes.sort((a, b) => {
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

/**
 * Delivers mail like the goal oriented bot but needs to return to farm periodically to see the horses
 */
function goalOrientedButLovesHorsesBot({place, parcels}, memory = {route: [], turnsWithoutSeeingHorse: Infinity}) {
    if (place === "Farm") {
        memory.turnsWithoutSeeingHorse = 0;
    }

    if (memory.route.length === 0) {
        let destination;
        if (memory.turnsWithoutSeeingHorse > 5) {
            destination = "Farm";
        } else {
            destination = goalOrientedBot({place, parcels}, []).direction;
        }
        memory.route = findRoute(roadGraph, place, destination);
    }

    return {direction: memory.route[0], memory: {route: memory.route.slice(1), turnsWithoutSeeingHorse: memory.turnsWithoutSeeingHorse++}}
}

/**
 * Polls all the other robots to see what they would do for a given state, and then picks the most popular option
 */
function pollBot(state, route = []) {
    let poll = []

    for (robot of Object.keys(roboDictionary)) {
        if (roboDictionary[robot] !== pollBot) {
            poll.push(roboDictionary[robot](state).direction);
        }
    }

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

    let pollResults = countBy(poll, j => j)

    pollResults.sort((a, b) => {
        if (a.count < b.count) {
            return 1;
        } else if (a.count > b.count){
            return -1;
        }
        return 0;
    });

    return {direction: pollResults[0].name, memory: route.slice(1)};
}

let roboDictionary = {
    routeBot: routeBot,
    goalOrientedBot: goalOrientedBot,
    randoBot: randoBot,
    goalOrientedButLovesHorsesBot: goalOrientedButLovesHorsesBot,
    brutusBot: brutusBot,
    pickupDropoffBot: pickupDropoffBot,
    thoughtfulPickupDropoffBot: thoughtfulPickupDropoffBot,
    closestActionBot: closestActionBot,
}

module.exports = { roboDictionary };