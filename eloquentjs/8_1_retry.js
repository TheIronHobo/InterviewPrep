function primitiveMultiply(a, b) {
    for(;;) {
        try {
            if (Math.random() > 0.8) {
                throw new Error("MultiplicationUnitFailure");
            }
            return a * b;
        } catch {
            return primitiveMultiply(a, b);
        }
    }
}