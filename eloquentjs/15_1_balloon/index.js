let balloon = document.getElementById("balloon");

let balloonSize = 1;
let explosionThreshold = 18;

let timeout;

let balloonHandler = event => {
    if (event.key === 'ArrowUp') {
        clearTimeout(timeout);

        timeout = setTimeout(() =>{
            if (balloonSize > explosionThreshold) {
                explosion();
                return;
            }
            balloonSize *= 1.1;
            balloon.style.fontSize = `${balloonSize}em`;
        }, 50);

        event.preventDefault();
    } else if (event.key === 'ArrowDown') {
        clearTimeout(timeout);

        timeout = setTimeout(() =>{
            balloonSize *= 0.9;
            balloon.style.fontSize = `${balloonSize}em`;
        }, 50);

        event.preventDefault();
    }
}

window.addEventListener('keydown', balloonHandler);

function explosion() {
    console.log("Pop!")
    balloon.textContent = '💥';
    window.removeEventListener('keydown', balloonHandler)
}
