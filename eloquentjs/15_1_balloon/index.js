let balloonSize = 25;
let balloon = document.getElementById("balloon");
console.log(`w: ${window.innerWidth} h: ${window.innerHeight}`)


let timeout;
window.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp') {
        clearTimeout(timeout);
        timeout = setTimeout(() => balloonSize *= 1.1, 50);
        balloon.style.fontSize = `${balloonSize}px`

        let xPos = window.innerWidth/2 - balloonSize/2;
        let yPos = window.innerHeight/2 - balloonSize/2;
        console.log(`x: ${xPos} y: ${yPos}`)
       // balloon.style.top = `${xPos}px`
       // balloon.style.left = `${yPos}px`
        event.preventDefault();
    } else if (event.key === 'ArrowDown') {
        clearTimeout(timeout);
        timeout = setTimeout(() => balloonSize *= 0.9, 50);
        balloon.style.fontSize = `${balloonSize}px`
        let xPos = window.innerWidth/2 - balloonSize/2;
        let yPos = window.innerHeight/2 - balloonSize/2;
        //console.log('width' + window.innerWidth)
        console.log(`x: ${xPos} y: ${yPos}`)
        balloon.style.top = `${xPos}px`
        balloon.style.left = `${yPos}px`
        console.log("top fetch" + balloon.style.top)
        event.preventDefault();
    }
});

