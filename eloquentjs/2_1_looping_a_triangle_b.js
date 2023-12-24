/**Draws a right triangle*/
function drawTriangle(height) { 
    if (Number.isNaN(height)) return;
    if (height<=0) return;
    let tri = [];
    for (let i = 0; i <= height; i++) {
        for (let j = 0; j < i; j++) {
            tri.push("#");
        }
        tri.push("\n");
    }
    console.log(tri.join(''));
}

drawTriangle(7);
