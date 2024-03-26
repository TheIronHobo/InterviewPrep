const fs = require('fs');
const { generateLogs } = require('./src/generateLogs');
const { textFile } = require ('./src/textFile');

activityTable(1).then(table => console.log(table));

async function activityTable(day) {
    let logFileList = await textFile('camera_logs.txt');
    let filePaths = logFileList.split('\n').filter(j => j.includes('log'));

    let timeStamps = [];
    for (let i = 0; i < filePaths.length; i++) {
        let logContents = await textFile(`logs/${filePaths[i]}`);
        let logTimeStamps = logContents.split('\n').filter(j => j);
        logTimeStamps.forEach(element => {
            timeStamps.push(element);
        });
    }

    let activityTable = [];
    for (let i = 0; i < 24; i++) {
        activityTable.push(0);
    }

    timeStamps = timeStamps.forEach((time) => {
        let date = new Date();
        date.setTime(time);
        let stampDay = date.getDay();
        if (stampDay === day) {
            let hour = date.getHours();
            activityTable[hour]++;
        }
    });

    return new Promise((resolve) => {
        resolve(activityTable);
    });
}

// output -> 
// [
//   0, 0,  0,  0, 0, 0, 0,  0,
//   0, 1, 20, 20, 2, 1, 9, 25,
//   0, 0,  0,  0, 0, 0, 0,  0
// ]
