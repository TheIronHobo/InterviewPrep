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
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }
        let action = robot(state, memory);
        state =  state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])}
}

function brutusBot(state,  memory = []) {
    sucessfulRoutes = [];
    console.log("State follow: ");
    console.log(state);

    if(memory.length === 0) {
        breadthSearch(state, history = []);
    }

    function breadthSearch(internalState, history = [], depth = 0) {

        history = [...history, internalState.place];
        let nextPlaces = accessibleLocations(internalState);

        if(depth >= 16) {
            return;
        }
        if(internalState.parcels.length === 0) {
            sucessfulRoutes.push(history);
        }

        for (let i = 0; i < nextPlaces.length; i++) {

           let newInternalState = internalState.move(nextPlaces[i]);

           breadthSearch(newInternalState, history, depth + 1);
        }
        
    }

    console.log("we having a good one eh?");
    sucessfulRoutes.sort((a,b) => {
        if(a.length > b.length) {
            return 1;
        } else if (a.length < b.length) {
            return -1;
        }
        return 0;
    });

    console.log(`Best route: ` + sucessfulRoutes[0]);
    console.log(`Best route length: ${sucessfulRoutes[0].length}`)
    console.log(`Worst route: ` + sucessfulRoutes[sucessfulRoutes.length-1]);
    throw "go home :)";

    function accessibleLocations(state) {
        return roadGraph[state.place]
    }

}

function randomPick(array) {
    let choice = Math.floor(Math.random()*array.length);
    return array[choice];
}

const roadGraph = buildGraph(roads);

runRobot(VillageState.random(2), brutusBot);

let exampleState =  {
    place:"Alice's House",
    parcels:[{place:"Alice's House",address:"Bob's House"}]
}
