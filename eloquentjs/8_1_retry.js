class MultiplicationUnitFailure extends Error{};

function primitiveMultiply(a, b) {
    if (Math.random() < 0.20) {
        console.log("Multiplication sucessful!")
        return a * b;
    } else {
        throw new MultiplicationUnitFailure();
    }
}

function MultiplicationUnitFailureErrorHanlder(inputFunction) {
    while (true) {
        try {
            return inputFunction();
        } catch(e) {
            if (e instanceof MultiplicationUnitFailure) {
                console.log("Multiplication failed. Trying again..");
            } else {
                throw e;
            }
        }
    }
}

console.log(MultiplicationUnitFailureErrorHanlder(j => primitiveMultiply(3,5)));

// Sample output: 
// Multiplication failed. Trying again..
// Multiplication failed. Trying again..
// Multiplication failed. Trying again..
// Multiplication sucessful!
// 15
