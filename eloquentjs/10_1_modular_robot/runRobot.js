function runRobot(state, robot, memory) {
    const maxIter = 5000;
    for (let turn = 0; turn < maxIter; turn++) {
        if (state.parcels.length === 0) {
            return turn;
        }

        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
    }
    throw `${robot.name} HAS EXCEEDED ${maxIter} ITERATIONS`;
}

module.exports = { runRobot };
