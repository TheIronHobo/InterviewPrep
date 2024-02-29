class NestNode {
    constructor(name) {
        this.name = name;
        this.connections = [];
        this.toolFlowLog = [];
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
            this.toolFlowLog[existingLogindex].routing[1] = outboundLocation;// = [location, ''];
            return;
        } 

        throw "CANNOT REMOVE NON-EXISTENT TOOL";

        //this.toolFlowLog.push({name: tool, routing: [location, '']});
    }

}

module.exports = {NestNode};