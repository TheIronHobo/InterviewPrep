const fs = require('fs');
const { gaussian } = require('./gaussian');

function generateLogs(startDate = 'January 1, 2024 00:00:00') {
    let logList = [];

    let msInHour = 3600000;
    let time = new Date(startDate).getTime();

    for (let i = 0; i < 52; i++) {
        let log = [];
        
        for (let k = 0; k < 24 * 7; k++) {
            time += msInHour;
            let hour = k % 24;

            if (Math.random() < Math.max(gaussian(hour, 2.2, 9, .7), gaussian(hour, 2, 13, 0.5))) {
                log.push(time);
            }
        }

        logList.push(log.join('\n'));
    }

    let cameraLog = '';
    
    for (let i = 0; i < logList.length; i++) {
        let file = `log-${i}.txt`;
        fs.writeFile(`logs/${file}`, logList[i], () => {});
        cameraLog += file + '\n';
    }

    fs.writeFile('camera_logs.txt', cameraLog, () => {});
}

generateLogs();

module.exports = { generateLogs };
