
let requestTypes = {

}

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

//defineRequestType("note", () => console.log("note delivered"));

module.exports = {requestType, requestTypes};
