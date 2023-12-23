function DrawTriangle(height){ // Draws a right triangle
    let tri = '';
    for(let i =0; i <= height; i++){
        for(let j =0; j< i; j++){
            tri+="#";
        }
        tri+="\n";
    }
    console.log(tri);
}

DrawTriangle(7);
