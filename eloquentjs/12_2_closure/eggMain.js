const { parse } = require('./parsing');
const { evaluate } = require('./evaluation');

/**
 * Builds topScope environment before parsing/evaluating program
 * @param {*} program 
 * @returns 
 */
function run(program) {
    const topScope = Object.create(null);

    topScope.true = true;
    topScope.false = false;

    topScope.print = value => {
        console.log(value);
        return value;
    };

    topScope.array = (...values) => {
        return values;
    };

    topScope.length = (array) => {
        return array.length;
    };

    topScope.element = (array, n) => {
        return array[n];
    }

    for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
        topScope[op] = Function("a, b", `return a ${op} b;`);
    }

    return evaluate(parse(program), topScope);
}

let program = 
`do(define(f, fun(a, fun(b, +(a, b)))),
   print(f(4)(5)))`;


console.log(JSON.stringify(parse(program)))

run(program);
// output --> 9

// Equivalent program in Javascript
let f = a => (b => a + b)
console.log(f(4)(5))
// output --> 9

// 1. Raw programs are parsed into nested object trees
// 2. Those objects they are then evaluated by `evaluate()` in the context of topScope
// 3. If a node in the evaluation is of name fun, then downstream node evaluations should be in the context of an inner scope
// 4. The line `let localScope = Object.create(topScope)` creates a new inner scope for the function environment using topScope (or scope ultimately derived from topScope) as a prototype for downtree returns
// 5. The `localScope` will contain global vars/functions inherited from the surrounding scope but those vars/functions may be overridden locally in accordance with typical prototype behaviour
// 6. A consequence of the design as-is is that it is not currently possible to change the value of outer-scope variable from within an inner scope. (this is a later exercise)
