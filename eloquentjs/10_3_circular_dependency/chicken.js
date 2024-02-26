const { egg } = require('./egg');

const chicken = {

 contents : egg,

 bagawk: () => {
    console.log("BAGAWK!");
 }

};

module.exports = { chicken };