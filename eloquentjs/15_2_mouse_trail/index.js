import { Missile } from "./missile.js";
import { Vector2 } from "./vector2.js";

let divisions = 10;
let squareSize = window.innerWidth/divisions;

console.log(squareSize);

for (let i = 0; i < divisions; i++) {
    let element = document.createElement('div');
    element.style.backgroundColor = 'red';
    element.style.border = 'solid';
    element.style.borderColor = 'blue'
    element.style.top = '20px'
    element.style.left = `${divisions}`
    element.style.width = '20px';
    element.style.height = '20px';
    document.body.appendChild(element);
}