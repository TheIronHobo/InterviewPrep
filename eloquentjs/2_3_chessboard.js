function Chessboard(width, height){
    for(let i = 0; i <height; i++){
        let output='';
        for(let j=0;j<width;j++){
            output += (j%2!=i%2) ? '#': ' ';
        }
        console.log(output);
    }
}

Chessboard(8, 8);
