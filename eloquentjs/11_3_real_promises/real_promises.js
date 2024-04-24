const { generateLogs } = require('./src/generateLogs');
const { fileToArray } = require('./src/fileToArray');
const { textFile } = require('./src/textFile');

/**
 * Returns promise of hourly security camera activity recorded for given day of week (0-6)
 * @param {*} day 
 * @returns 
 */
function activityTable(day) {
    return new Promise((resolve, reject) => {
        textFile('camera_logs.txt')
        .then(file => Promise.resolve(fileToArray(file)))
        .then(array => Promise.all(array.map(
            fileName => {
                return textFile(`weekly_logs/${fileName}`);
            }
        )))
        .then(weeklyLogFiles => 
            Promise.resolve(weeklyLogFiles.map(fileContents => {
                return fileToArray(fileContents);
            }))
        )
        .then(logs => {        
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

            resolve(hourlyActivity);
        });
    });
}

generateLogs();
activityTable(6).then(table => console.log(table));

// Output: 
// [
//     0,   0,   0,   0,   0,   0, 260, 260,
//   416, 468, 728, 416, 416, 416, 260, 260,
//    52, 104,   0,   0,   0,   0,   0,   0 
// ]
