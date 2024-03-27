const { generateLogs } = require('./src/generateLogs');
const { textFile } = require('./src/textFile');

/**
 * Returns promise of hourly security camera activity recorded for given day of week (0-6)
 * @param {*} day 
 * @returns 
 */
async function activityTable(day) {
    const camera_logs = await textFile('camera_logs.txt');
    const filePaths = camera_logs.split('\n').filter(j => j);

    const timeStamps = [];
    for (let i = 0; i < filePaths.length; i++) {
        const logContents = await textFile(`weekly_logs/${filePaths[i]}`);

        logContents.split('\n').filter(j => j).forEach(element => {
            timeStamps.push(element);
        });
    }

    const activity = Array(24).fill(0);

    timeStamps.forEach((time) => {
        const date = new Date();
        date.setTime(time);

        if (date.getDay() === day) {
            const hour = date.getHours();
            activity[hour]++;
        }
    });

    return new Promise((resolve) => {
        resolve(activity);
    });
}

generateLogs();
activityTable(1).then(table => console.log(table));

// output -> 
// [
//     0,   0,   0, 0, 0,   0,   0, 0,
//     0, 260, 572, 0, 0, 156, 156, 0,
//     0,   0,   0, 0, 0,   0,   0, 0 
// ]
