const { findRoute } = require('./findRoute');
const { Timeout } = require('./timeoutError');

let requestTypes = {};

function defineRequestType(requestTypeName, callback) {
    requestTypes[requestTypeName] = callback;
}

function requestType(name, handler) {
    defineRequestType(name, (nest, content, source, callback) => {
        try {
            Promise.resolve(handler(nest, content, source))
            .then(response => callback(null, response), 
            failure => callback(failure));
        } catch (exception) {
            callback(exception);
        }
    });
}

requestType("note", (nest, content, source, done) => {
    console.log(`${nest.name} received note: ${content}`);
    done();
})

requestType("ping", () => "pong");

requestType("route", (nest, {target, type, content}) => {
    return routeRequest(nest, target, type, content);
})

requestType("storage", (nest, storageCategory, itemName) => findInStorage(nest, storageCategory, itemName));


/**
 * Returns a promise that may resolve into the desired value returned by a nest
 * @param {*} nest 
 * @param {*} target 
 * @param {*} type 
 * @param {*} content 
 * @returns 
 */
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


/**
 * Returns a request from the messages target or from the next closest node to the target
 * @param {*} nest 
 * @param {*} target 
 * @param {*} type 
 * @param {*} content 
 * @returns 
 */
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


module.exports = {requestType, requestTypes, routeRequest};
