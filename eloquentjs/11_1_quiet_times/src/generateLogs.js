const fs = require('fs');
const { gaussian } = require('./gaussian');

function generateLogs() {
    let startTime = new Date('January 1, 2024 00:00:00').getTime();
    const logList = Array(52).fill([]);

    for (let i = 0; i < 24 * 7 * 52; i++) {
        const hour = i % 24;
        const week = Math.floor((i / (7 * 24)));
        const personProbabilty = Math.max(gaussian(hour, 2.2, 9, .2), gaussian(hour, 2, 13, 0.1));

        if (Math.random() < personProbabilty) {
           logList[week].push(startTime + i * 3600000);
        }
    }

    let cameraDog = logList.map((element, index) => {
        let file = `week_${index}_activity_log.txt`;
        fs.writeFile(`weekly_logs/${file}`, element.join('\n'), () => {});
        return file;
    });

    fs.writeFile('camera_logs.txt', cameraDog.join('\n'), () => {});
}

module.exports = { generateLogs };
