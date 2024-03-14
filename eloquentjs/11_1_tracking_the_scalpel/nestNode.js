const { requestType, requestTypes } = require('./requestTypes');
const { deepEqual } = require('./deepComparison');

class NestNode {
    constructor(name) {
        this.name = name;
        this.connections = [];
        this.toolFlowLog = [];
        this.messageHistory = [];
        this.storage = {
            enemies: ["Gray Squirrel", "Mrs. Martin", "Hawk"]
        };
    }

    addTool(toolName, inboundLocation) {

        let existingLogindex = this.toolFlowLog.findIndex((log) => log.name === toolName);

        if (existingLogindex !== -1) {
            this.toolFlowLog[existingLogindex].routing = [inboundLocation, ''];
            return;
        }

        this.toolFlowLog.push({name: toolName, routing: [inboundLocation, '']});
    }

    removeTool(toolName, outboundLocation) {
        let existingLogindex = this.toolFlowLog.findIndex((log) => log.name === toolName);

        if (existingLogindex !== -1) {
            this.toolFlowLog[existingLogindex].routing[1] = outboundLocation;
            return;
        } 

        throw "CANNOT REMOVE NON-EXISTENT TOOL";
    }

    send(destination, requestTypeName, content, callback) {
        if (this.isRepeatMessage(destination, requestTypeName, content, callback)) {
            return;
        }

        this.messageHistory.push({
            destination: destination,
            requestTypeName: requestTypeName,
            content: content,
            callback: callback,
       });

       if (this.name === destination) {
        console.log("Name matches destination.");
            requestTypes[requestTypeName](this, content, this.name, callback);
       } else {
           // let hopNodeName = findRoute(this.name, destination, NetConnections);
            this.connections.forEach((connection) => connection.send(destination, requestTypeName, content, callback));
       }
    }



    /**
     * Is this message already in our message history?
     * @param {*} destination 
     * @param {*} requestType 
     * @param {*} content 
     * @param {*} callback 
     */
    isRepeatMessage(destination, requestTypeName, content, callback) {
        let testMessage = {
            destination: destination,
            requestTypeName: requestTypeName,
            content: content,
            callback: callback,
        }

        let repeatMessage = false;

        this.messageHistory.forEach((message) => {
            if (deepEqual(testMessage, message)) {
                repeatMessage = true;
            } 
        });

        return repeatMessage;
    }

    readStorage(name, callback) {
        let result = this.storage[name];
        callback(result);
    }

    neighbors() {
        let output = [];
        this.connections.forEach((connection) => output.push(connection.name));
        return output;
    }

    display() {
        console.log(`Name: ${this.name}`);
        process.stdout.write("Connections: ");
        this.connections.forEach((connection) => process.stdout.write("| " + connection.name + " |"));
    }
}

module.exports = {NestNode};
