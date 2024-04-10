const { time } = require('console');
const { generateLogs } = require('./src/generateLogs');
const { textFile } = require('./src/textFile');
const { fileToArray } = require('./src/fileToArray');

/**
 * Returns promise of hourly security camera activity recorded for given day of week (0-6)
 * @param {*} day 
 * @returns 
 */
async function activityTable(day) {
    const logs = await Promise.all(
        fileToArray(await textFile('camera_logs.txt'))
            .map(async fileName => fileToArray(await textFile(`weekly_logs/${fileName}`))
    ));

    const hourlyActivity = Array(24).fill(0);

    for (const log of logs) {
        for (const time of log) {
            const date = new Date(parseInt(time));

            if (date.getDay() === day) {
                const hour = date.getHours();
                hourlyActivity[hour]++;
            }
        }
    }

    return hourlyActivity;
}

generateLogs();
activityTable(1).then(table => console.log(table));

// output -> 
// [
//     0,   0,   0,   0,   0,  52, 208, 104,
//   416, 624, 624, 260, 208, 156, 260, 104,
//   104, 208,   0,   0,  52,   0,   0,   0
// ]
