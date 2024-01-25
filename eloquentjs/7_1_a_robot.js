const roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
];

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];  

function buildGraph(edges) {
    let graph = Object.create(null);

    function addEdge(from, to) {
        if(graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }

    for(let [from, to] of edges.map(r => r.split('-'))) {
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
        if(!roadGraph[this.place].includes(destination)) { //How do we 'pickup' parcels? I think when we do a move it changes the address of all parcels at the current address to the new address. Somehow...
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p;
                return {place: destination, address: p.address};
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }

    }
}

VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({place, address})
    }
    return new VillageState("Post Office", parcels);
}

function runRobot(state, robot, memory) {
    const maxIter = 500;
    for (let turn = 0; turn < maxIter; turn++) {
        if (state.parcels.length == 0) {
            return turn;
        }
        let action = robot(state, memory);
        state =  state.move(action.direction);
        memory = action.memory;
    }
    throw `${robot.name} HAS EXCEEDED ${maxIter} ITERATIONS`;
}

function robotComparison(robots, numTests) {
    let results = [];

    const parcelCount = 5;
    let tests = [];

    for (let i = 0; i < numTests; i++) {
        tests.push(new VillageState.random(5))
    }

    for (robot of Object.keys(robots)) {
        console.log(`Testing: ${robot}`);
        let acc = 0;

        const t0 = performance.now();
        for (test of tests) {
            acc += runRobot(test, robots[robot]);
        }
        const t1 = performance.now();
        const delta = t1-t0;
        
        results.push({name: robot, averageSteps:acc/numTests, averageMilliseconds: delta/numTests});
    }

    return results;
}

function randomPick(array) {
    let choice = Math.floor(Math.random()*array.length);
    return array[choice];
}

function accessibleLocations(state, graph) {
    return graph[state.place]
}

/**
 * Pulled from E-JS with no alteration
 * @param {*} graph 
 * @param {*} from 
 * @param {*} to 
 * @returns 
 */
function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
      let {at, route} = work[i];
      for (let place of graph[at]) {
        if (place == to) return route.concat(place);
        if (!work.some(w => w.at == place)) {
          work.push({at: place, route: route.concat(place)});
        }
      }
    }
}

function randoBot(state) {
    return {direction: randomPick(roadGraph[state.place])}
}

function brutusBot(state,  memory = {route: [], relevantLocations: []}) {
    let bestRoute;

    if(memory.relevantLocations.length === 0) {
        for({place, address} of state.parcels) {
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

    function bruteSearch(internalState, history = [], depth = 0) {
        history = [...history, internalState.place];
        let nextPlaces = accessibleLocations(internalState, roadGraph);

        if (depth >= roads.length*2 + 1) {
            return;
        }
        if (bestRoute !== undefined && history.length >= bestRoute.length) {
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

            const uselessBacktracking = !memory.relevantLocations.includes(lastLocation) && (secondToLastLocation === currentLocation);
            if (uselessBacktracking) {
                return;
            }
        }

        for (let i = 0; i < nextPlaces.length; i++) {
           let newInternalState = internalState.move(nextPlaces[i]);
           bruteSearch(newInternalState, history, depth + 1);
        }
    }

    return {
        direction: memory.route[0],
        memory: {route: memory.route.slice(1), relevantLocations: memory.relevantLocations}
    };
}

/**
 * Bot pulled from E-JS with minimal alteration
 * @param {*} state 
 * @param {*} memory 
 * @returns 
 */
function routeRobot(state, memory = []) {
    if (memory.length === 0) {
      memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

/**
 * Bot pulled from E-JS with minimal alteration
 * @param {*} param0 
 * @param {*} route 
 * @returns 
 */
function goalOrientedRobot({place, parcels}, route = []) {
    if (route.length == 0) {
      let parcel = parcels[0];
      if (parcel.place != place) {
        route = findRoute(roadGraph, place, parcel.place);
      } else {
        route = findRoute(roadGraph, place, parcel.address);
      }
    }
    return {direction: route[0], memory: route.slice(1)};
}

function lovesHorsesRobot({place, parcels}, memory = {route: [], turnsWithoutSeeingHorse: Infinity}) {
    if (place === "Farm") {
        memory.turnsWithoutSeeingHorse = 0;
    }
    if (memory.turnsWithoutSeeingHorse > 0) {
        memory.route = findRoute(roadGraph, place, "Farm");
    } else if (memory.route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            memory.route = findRoute(roadGraph, place, parcel.place);
        } else {
            memory.route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: memory.route[0], memory: {route: memory.route.slice(1), turnsWithoutSeeingHorse: memory.turnsWithoutSeeingHorse++}}
}

const roadGraph = buildGraph(roads);

let roboDictionary = {
    randoBot: randoBot,
    lovesHorsesRobot: lovesHorsesRobot,
    brutusBot: brutusBot,
    routeRobot: routeRobot,
    goalOrientedRobot: goalOrientedRobot,
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
