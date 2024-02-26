const { produceTree } = require('./acorn');

//console.log(acorn);

const produceAcorn = () => {
    console.log("Producing Acorn!");
    produceTree()
}

module.exports = { produceAcorn };

produceAcorn();