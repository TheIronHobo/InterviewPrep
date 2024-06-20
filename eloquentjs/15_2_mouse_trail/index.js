import { Vector2 } from "./vector2.js";
import { animator } from "./animator.js"; 

let middleScreen = new Vector2(window.innerWidth/2, window.innerHeight/2)

window.addEventListener("mousemove", event => {
    let mousePosition = new Vector2(event.clientX, event.clientY);
    let sparkleElement = document.createElement('div');
    sparkleElement.className = "sparkle";
    sparkleElement.ttl = 1000;
    sparkleElement.position = mousePosition;
    let randomVelocity = new Vector2(Math.random()*2-1, Math.random()*2-1).mult(10);
    sparkleElement.velocity = randomVelocity;
    console.log
    document.body.appendChild(sparkleElement);
    // sparkles.push(new Sparkler(sparkleElement, mousePosition, randomVelocity))
});


function sparkAnimation(timeData) {
    let [time, deltaTime] = timeData;

    let sparkles = document.getElementsByClassName("sparkle");

    for (let sparkle of sparkles) {
        sparkle.position = sparkle.position.add(sparkle.velocity);
        sparkle.style.transform = `translate(${sparkle.position.x}px, ${sparkle.position.y}px)`;
        sparkle.ttl -= deltaTime;
        if (sparkle.ttl < 0) {
            document.body.removeChild(sparkle);
        }
    }

    // let sparklers = [];
    // if (state == null) {
    //     let sparklers = [];
    //     for (let i = 0; i < 20; i++) {  
    //         sparklers.push(new Sparkler())
    //     }
    //     return state = {
    //         state.sparklers = sparklers;
    //     }        
    // }

    // for (let sparklers of state.sparklers) {
    //     sparkler
    // }
   // sparklers = state.sparklers;

}

animator(sparkAnimation);



// for (let i = 0; i < divisions; i++) {
//     let element = document.createElement('div');
//     element.style.backgroundColor = 'red';
//     element.style.border = 'solid';
//     element.style.borderColor = 'blue'
//     element.style.top = '20px'
//     element.style.left = `${divisions}`
//     element.style.width = '20px';
//     element.style.height = '20px';
//     document.body.appendChild(element);
// }