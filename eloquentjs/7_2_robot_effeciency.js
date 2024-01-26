const roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildGraph(edges) {
    const graph = Object.create(null);

    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }

    for (let [from, to] of edges.map(r => r.split('-'))) {
        addEdge(from, to);
        addEdge(to, from);
    }

    return graph;
}

class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            const parcels = this.parcels.map(p => {
                if (p.place !== this.place) return p;
                return {place: destination, address: p.address};
            }).filter(p => p.place !== p.address);

            return new VillageState(destination, parcels);
        }

    }
}

VillageState.random = function(parcelCount = 5) {
    const parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;

        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place === address);

        parcels.push({place, address})
    }
    return new VillageState("Post Office", parcels);
}


function randomPick(array) {
    const choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function findRoute(graph, from, to) {
    const work = [{at: from, route: []}];

    for (let i = 0; i < work.length; i++) {
      const {at, route} = work[i];

      for (let place of graph[at]) {
        if (place === to) {
            return route.concat(place);
        }

        if (!work.some(w => w.at === place)) {
          work.push({at: place, route: route.concat(place)});
        }
      }
    }
}

/**
 * ----------- ROBOT SIMULATION/TESTING -----------
 */

function runRobot(state, robot, memory) {
    const maxIter = 5000;
    for (let turn = 0; turn < maxIter; turn++) {
        if (state.parcels.length === 0) {
            return turn;
        }

        let action = robot(state, memory);
        state =  state.move(action.direction);
        memory = action.memory;
    }
    throw `${robot.name} HAS EXCEEDED ${maxIter} ITERATIONS`;
}

function robotComparison(robots, numTests, parcelCount) {
    const tests = [];
    for (let i = 0; i < numTests; i++) {
        tests.push(new VillageState.random(parcelCount))
    }

    const results = [];
    for (robot of Object.keys(robots)) {
        console.log(`Testing: ${robot}`);

        let acc = 0;
        const t0 = performance.now();
        for (test of tests) {
            acc += runRobot(test, robots[robot]);
        }
        const t1 = performance.now();
        const delta = t1 - t0;
        
        results.push({name: robot, averageSteps: acc / numTests, averageMilliseconds: delta / numTests});
    }

    return results;
}

//------------------------------------

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
