async function findInStorage(nest, storageCategory, itemName) {
    let local = await storage(nest, storageCategory, itemName); //tries to get 
    if (local !== undefined && local.routing[1] === '') {
            return local;
    }
    let sources = nest.neighbors;
    while (sources.length > 0) {
            let source = sources[Math.floor(Math.random()*sources.length)];
            sources = sources.filter(n => n != source);
            try {
                    let found = await routeRequest(nest, source, "storage", {storageCategory, itemName});
                    if (found != null) {
                            return found;
                    }
            } catch (_) {}
    }
    throw new Error("Not found!");
}

function anyStorage(nest, source, name) {
    if (source === nest.name) {
            return storage(nest, name);
    } else {
            return routeRequest(nest, source, "storage", name)
    }
}

function storage(nest, storageCategory, itemName) {
    return new Promise(resolve => {
            nest.readStorage(storageCategory, itemName, result => resolve(result))
    });
}

module.exports = {findInStorage, anyStorage, storage};
