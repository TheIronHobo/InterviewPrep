function skipSpace(string) {
    let first = string.search(/\S/);
    return (first === -1) ? "" : string.slice(first);
}
function skipComment(string) {
    if (string[0] !== '#') {
        return string;
    }
    let reg = /(\s*#.*\n\s*)+?/d;
    let endOfCommentsIndex = reg.exec(string).indices[0][1];
    console.log()
    console.log(reg.exec(string))
    return (endOfCommentsIndex === -1) ? "" : string.slice(endOfCommentsIndex);
}

function cleanProgram(string) {
    let output = skipSpace(string);
    output = skipComment(output);
    output = skipSpace(output);
   // output = skipSpace(string);
   // output = skipComment(output);
    console.log('output')
    console.log(`[${output}]`)
    console.log()
    return output;
}

function parseExpression(program) {
    program = cleanProgram(program);

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
    program = cleanProgram(program);

    expressionIsApplication = program[0] === "(";

    if (expressionIsApplication) {
        program = cleanProgram(program.slice(1));
        expr = { type: "apply", operator: expr, args: [] };

        while (program[0] !== ")") {
            let arg = parseExpression(program);
            expr.args.push(arg.expr);
            program = cleanProgram(arg.rest);

            if (program[0] === ",") {
                program = cleanProgram(program.slice(1));
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

    parsingError = cleanProgram(rest).length > 0;

    if (parsingError) {
        throw new SyntaxError("Unexpected text after program");
    }

    return expr;
}

module.exports = { parse }
