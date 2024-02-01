class MultiplicationUnitFailure extends Error{};

function primitiveMultiply(a, b) {
    const innerPrimitiveMultiply = j => {
        if (Math.random() < 0.80) {
            throw new MultiplicationUnitFailure();
        } else {
            console.log("Multiplication sucessful!")
            return a * b;
        }
    }

    return MultiplicationUnitFailureErrorHanlder(innerPrimitiveMultiply);
}

function MultiplicationUnitFailureErrorHanlder(inputFunction) {
    for(;;) {
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

console.log(primitiveMultiply(3, 5));

// Sample output: 
// Multiplication failed. Trying again..
// Multiplication failed. Trying again..
// Multiplication failed. Trying again..
// Multiplication sucessful!
// 15
