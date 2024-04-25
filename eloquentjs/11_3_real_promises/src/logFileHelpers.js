const fs = require('fs');

const listStringToArray = file => file.split('\n').filter(j => j.length > 0);

function textFile(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.toString());
            }
        })
    });
}

module.exports = { listStringToArray, textFile }
