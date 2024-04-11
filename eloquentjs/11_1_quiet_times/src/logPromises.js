const { fileToArray } = require("./fileToArray");
const { textFile } = require('./textFile');

const logPromises = async () => {
    return (await Promise.all(
        fileToArray(await textFile('camera_logs.txt'))
            .map(async fileName => fileToArray(await textFile(`weekly_logs/${fileName}`))
    )));
}

module.exports = { logPromises };
