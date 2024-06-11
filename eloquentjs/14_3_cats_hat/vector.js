class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(input) {
        return new Vector2(this.x + input.x, this.y + input.y)
    }
    
    sub(input) {
        return new Vector2(this.x - input.x, this.y - input.y)
    }

}
