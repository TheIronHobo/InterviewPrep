const { crowNetLocations, 
        crowNetConnections, 
        crowNetGraph, 
        crowNetNodes, 
        crowNetDisplay,
        initializeCrowNet,
        scalpelRandomWalk } = require('./crow-tech');
const { findRoute } = require('./findRoute');

const { requestType, requestTypes } = require('./requestTypes');

const { Timeout } = require('./timeoutError');

//crowNetDisplay();
let bigOak = crowNetNodes.find((node) => node.name === "Big Oak");
let butchersShop = crowNetNodes.find((node) => node.name === "Butcher's Shop");

requestType("note", (nest, content, source, done) => {
        console.log(`${nest.name} received note: ${content}`);
        done();
})

requestType("ping", () => "pong");

requestType("route", (nest, {target, type, content}) => {
        return routeRequest(nest, target, type, content);
})

// requestType("storage", (nest, name) => storage(nest, name));

requestType("storage", (nest, name) => findInStorage(nest, name));

// requestType("connections", (nest, {name, neighbors}, source) => {
//         let connections = nest.connections;
// })

bigOak.display();
bigOak.send("Hawthorn", "note", "Let's caw loudly at 7PM", () => console.log("Note delivered."));


function request(nest, target, type, content) {
        return new Promise((resolve, reject) => {
                let done = false;
                function attempt(n) {
                        nest.send(target, type, content, (failed, value) =>  {
                                done = true;
                                if (failed) {
                                        reject(failed);
                                } else {
                                        resolve(value);
                                }
                        });

                        setTimeout(() => {
                                if (done) {
                                        return;
                                } else if (n < 3) {
                                        attempt(n + 1);
                                } else {
                                        reject(new Timeout("Timed out"));
                                }
                        }, 250);
                }
                attempt(1);
        });
}

function availableNeighbors(nest) {
        let requests = nest.connections.map(neighbor => {
                return request(nest, neighbor, "ping")
                .then(() => true, () => false);
        });
        return Promise.all(requests).then(result => {
                return nest.connections.filter((_, i) => result[i]);
        });
}



//console.log(bigOak.neighbors());

function routeRequest(nest, target, type, content) {
        if (nest.neighbors().includes(target)) {
                return request(nest, target, type, content);
        } else {
                let via = findRoute(nest.name, target, crowNetConnections);
                if (!via) {
                        throw new Error(`No route to ${target}`);
                }
                return request(nest, via, "route", {target, type, content});
        }
}

function storage(nest, name) {
        return new Promise(resolve => {
                nest.readStorage(name, result => resolve(result))
        });
}

// function findInStorage(nest, name) {
//         return storage(nest, name).then(found => {
//                 if (found != null) {
//                         return found
//                 } else {
//                         return findInRemoteStorage(nest, name);
//                 }
//         });
// }

async function findInStorage(nest, name) {
        let local = await storage(nest, name);
        if (local != null) {
                return local;
        }
        let sources = network(nest).filter(n => n != nest.name);
        while (sources.length > 0) {
                let source = sources[Math.floor(Math.random()*sources.length)];
                sources = sources.filter(n => n != source);
                try {
                        let found = await routeRequest(nest, source, "storage", name);
                        if (found != null) {
                                return found;
                        }
                } catch (_) {}
        }
        throw new Error("Not found!");
}


function network(nest) {
        return Array.from(nest.state)
}

//availableNeighbors(bigOak).then((value) => console.log(value));



// storage(bigOak, "enemies").then(value => console.log("Got", value));




//requestTypes.note();

// need to do the async stuff here

