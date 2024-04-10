const fileToArray = file => file.split('\n').filter(j => j.length > 0);

module.exports = { fileToArray }
