class NestNode {
    constructor(name) {
        this.name = name;
        this.connections = [];
        this.toolFlowLog = [];
    }

    addTool(toolName, location) {

        let existingLogindex = this.toolFlowLog.findIndex((log) => log.name === toolName);

        if (existingLogindex !== -1) {
            this.toolFlowLog[existingLogindex].routing = [this.name, ''];
            return;
        } 

        this.toolFlowLog.push({name: tool, routing: [location, '']});
    }

    removeTool(tool, location) {
        let existingLogindex = this.toolFlowLog.findIndex((log) => log.name === tool.name);
        if (existingLogindex !== -1) {
            
        } else {
            
        }
    }


}

module.exports = {NestNode};