const { requestType, requestTypes } = require('./request');
const { deepEqual } = require('./deepComparison');

class NestNode {
    constructor(name) {
        this.name = name;
        this.connections = [];
        this.messageHistory = [];
        this.storage = {
            enemies: [],
            tools: [],
        };
    }

    addTool(toolName, sourceName) {
        let exisitingToolIndex = this.storage.tools.findIndex(toolEntry => toolEntry.name === toolName);

        if (exisitingToolIndex !== -1) {
            this.storage.tools[exisitingToolIndex].routing = [sourceName, ''];
            return;
        }

        this.storage.tools.push({
            name: toolName,
            routing: [sourceName, ''],
        });

    }

    removeTool(toolName, destName) {
        let exisitingToolIndex = this.storage.tools.findIndex(toolEntry => toolEntry.name === toolName);

        if (exisitingToolIndex !== -1) {
            this.storage.tools[exisitingToolIndex].routing[1] = destName;
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
            this.connections.forEach((connection) => connection.send(destination, requestTypeName, content, callback));
       }
    }

    sendBeta(destination, requestTypeName, content, callback) {
 
        //I think this is where we handle requests differently
        // based on type
        if (requestTypeName === 'storage') {

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

    readStorage(storageCategory, itemName, callback) {
        let result = this.storage[storageCategory].find(item => item.name === itemName);
        console.log(`Result is ${JSON.stringify(result)}`);
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
