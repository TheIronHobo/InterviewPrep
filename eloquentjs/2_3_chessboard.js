function Chessboard(width, height = width) {
    if (isNaN(width) || isNaN(height)) {
        throw "Chessboard dimensions cannot be NaN";
        return;
    }
    if ((width <= 0) || (height <= 0)) {
        throw "Chessboard dimensions cannot be zero or less";
        return;
    }
    for (let i = 0; i < height; i++) {
        let output = '';
        for (let j = 0; j < width; j++) {
            let reverseRowPattern = (j%2 != i%2);
            output += reverseRowPattern ? '#' : ' ';
        }
        console.log(output);
    }
}

Chessboard(8);
