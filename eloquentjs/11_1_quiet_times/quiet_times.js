const fs = require('fs');

function generateLogList(startDate) {
    let logList = [];

    let msInHour = 3600000;

    let time = new Date(startDate).getTime();
    console.log(time);
    for (let i = 0; i < 52; i++) {
        let log = '';
        for (let j = 0; j < 7; j++) {
            for (let k = 0; k < 24; k++) {
                time += msInHour;
                if ((Math.random()*24) < Math.abs(k-12)) {
                    //log.push(time);
                    log += time + '\n';
                }
            }
        }
        logList.push(log);
    }

    return logList;
}

let logList = generateLogList('January 1, 2024 00:00:00');
let cameraLog = '';

// logList.forEach(weeklyLog => {
//     fs.writeFile('log.txt.', JSON.stringify(log, null, 4), () => console.log('fileCreated'));    
// })
// we should use promise. all for these and then call the camera log file once its done
for (let i = 0; i < logList.length; i++) {
    let file = `logs/log-${i+1}.txt`;
    fs.writeFile(file, logList[i], () => console.log(`Generated log #${i+1}`));
    //fileList.push(file);
    cameraLog += file + '\n';
}

fs.writeFile('cameraLog.txt', cameraLog, () => console.log(`Generated Camera Log`));


///fs.writeFile('cameraLog.json', JSON.stringify(log, null, 4), () => console.log('fileCreated'));

