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
    `do(define(sum, fun(array,
        do(define(i, 0),
            define(sum, 0),
            while(<(i, length(array)),
            do(define(sum, +(sum, element(array, i))),
                define(i, +(i, 1)))),
            sum))),
    print(sum(array(1, 2, 3))))`;

run(program);

// output --> 6
