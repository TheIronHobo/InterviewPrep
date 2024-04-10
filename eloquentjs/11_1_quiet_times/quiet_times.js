const { time } = require('console');
const { generateLogs } = require('./src/generateLogs');
const { textFile } = require('./src/textFile');

/**
 * Returns promise of hourly security camera activity recorded for given day of week (0-6)
 * @param {*} day 
 * @returns 
 */
async function activityTable(day) {
    let logs = await Promise.all((await textFile('camera_logs.txt'))
    .split('\n')
    .filter(j => j.length > 0)
    .map(async fileName => {
        return await textFile(`weekly_logs/${fileName}`);
    }));

    const hourlyActivity = Array(24).fill(0);

    for (const log of logs) {
        log
        .split('\n')
        .filter(j => j.length > 0)
        .forEach(time => {
            const date = new Date(parseInt(time));

            if (date.getDay() === day) {
                const hour = date.getHours();
                hourlyActivity[hour]++;
            }
        })
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
