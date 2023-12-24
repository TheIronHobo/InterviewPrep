/**Draws a right triangle utilizing the += operator*/
function drawTriangle(height) { 
    if (Number.isNaN(height)) return;
    if (height <= 0) return;
    let tri = '';
    for (let i = 0; i <= height; i++) {
        for (let j = 0; j < i; j++) {
            tri += "#";
        }
        tri += "\n";
    }
    console.log(tri);
}

/**Draws a right triangle utilizing array join method*/
function drawTriangleArrayJoin(height) { 
    if (Number.isNaN(height)) return;
    if (height <= 0) return;
    let tri = [];
    for (let i = 0; i <= height; i++) {
        for (let j = 0; j < i; j++) {
            tri.push("#");
        }
        tri.push("\n");
    }
    console.log(tri.join(''));
}

/**Draws a right triangle utilizing combination of array join and repeat function*/
function drawTriangleRepeat(height) { 
    if (Number.isNaN(height)) return;
    if (height <= 0) return;
    let tri = [];
    for (let i = 0; i <= height; i++) {
        tri.push(('#').repeat(i))
        tri.push("\n");
    }
    console.log(tri.join(''));
}

drawTriangle(7);
//drawTriangleArrayJoin(7);
//drawTriangleRepeat(7);
