const { produceAcorn } = require('./tree');

//console.log(tree);

const produceTree = () => {
    console.log("Producing Tree!");
    produceAcorn()
}

module.exports = { produceTree };