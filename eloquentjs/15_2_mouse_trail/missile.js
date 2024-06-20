import { Vector2 } from "./vector2.js";

class Missile {
    constructor(position = new Vector2(), angle = 0, velocity = new Vector2()) {
        this.position = position;
        this.angle = angle;
        this.velocity = velocity;
    }

    start() {
        let element = document.createElement('img');
        element.src = "./img/rocketSprite.png";
        element.class = "missile";
        this.element = element;
        document.body.appendChild(this.element);
    }

    update() {
        let imageWidth = 30;
        let imageHeight = 56;
        // this.element.style.top = 100;//(this.position.y - (56/2)) + "px";
        // this.element.style.left = 120;//(this.position.x - (30/2)) + "px";
      //  this.ele
        this.element.style.transform = `
        translate(${this.position.x}px, ${this.position.y}px)
        rotate(${0}deg)`
        this.element.style.backgroundColor = "blue";
    }

    render() {

    }
}

export { Missile }

// class MissileSpawner {

// }
