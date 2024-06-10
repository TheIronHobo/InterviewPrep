function skipSpace(string) {
    let first = string.search(/\S/);
    return (first === -1) ? "" : string.slice(first);
}

function parseExpression(program) {
    program = skipSpace(program);

    let match, expr;
    if (match = /^"([^"]*)"/.exec(program)) { // Matches Egg strings
        expr = { type: "value", value: match[1] }; 
    } else if (match = /^\d+\b/.exec(program)) { // Matches numbers
        expr = { type: "value", value: Number(match[0]) };
    } else if (match = /^[^\s(),#"]+/.exec(program)) {
        expr = { type: "word", name: match[0] };
    } else {
        throw new SyntaxError("Invalid syntax: " + program);
    }

    return parseApply(expr, program.slice(match[0].length));
}

function parseApply(expr, program) {
    program = skipSpace(program);

    expressionIsApplication = program[0] === "(";

    if (expressionIsApplication) {
        program = skipSpace(program.slice(1));
        expr = { type: "apply", operator: expr, args: [] };

        while (program[0] !== ")") {
            let arg = parseExpression(program);
            expr.args.push(arg.expr);
            program = skipSpace(arg.rest);

            if (program[0] === ",") {
                program = skipSpace(program.slice(1));
            } else if (program[0] !== ")") {
                throw new SyntaxError("Expected ',' or ')'");
            }
        }

        return parseApply(expr, program.slice(1));
    } else {
        return { expr: expr, rest: program };
    }

}

function parse(program) {
    let { expr, rest } = parseExpression(program);

    parsingError = skipSpace(rest).length > 0;

    if (parsingError) {
        throw new SyntaxError("Unexpected text after program");
    }

    return expr;
}

module.exports = { parse }
