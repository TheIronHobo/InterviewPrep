import { Vector2 } from "./vector2.js";

class Sparkler {
    constructor(element, position = Vector2.Zero(), velocity = Vector2.Zero()) {
        this.position = position;
        this.velocity = velocity;
        this.element = element;
        this.element.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
        this.timeToLive = 10;
    }

    update(deltaTime) {
        this.timeToLive -= deltaTime;
        this.position = this.position.add(this.velocity);
        this.element.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`
    }

    delete() {
        document.body.removeChild(this.element);
    }
}
