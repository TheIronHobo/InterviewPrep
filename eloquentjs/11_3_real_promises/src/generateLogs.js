const fs = require('fs');

function gaussian(x, variance, center, scale = 1) {
    const exponent = (x - center) ** 2 / (-2 * variance * variance);
    return scale * Math.E ** exponent;
};

function generateLogs() {
    let startTime = new Date('January 1, 2024 00:00:00').getTime();
    const logList = Array(52).fill([]);

    logList.forEach((log, index) => {
        for (let i = 0; i < 7 * 24; i++) {
            const hour = i % 24;
            const personProbabilty = Math.max(gaussian(hour, 2.2, 9, .2), gaussian(hour, 2, 13, 0.1));
    
            if (Math.random() < personProbabilty) {
                log.push(startTime + index * 604800000 + i * 3600000);
            }
        }
    })

    let cameraLog = logList.map((element, index) => {
        let file = `week_${index}_activity_log.txt`;
        fs.writeFile(`weekly_logs/${file}`, element.join('\n'), () => {});
        return file;
    });

    fs.writeFile('camera_logs.txt', cameraLog.join('\n'), () => {});
}

module.exports = { generateLogs };
