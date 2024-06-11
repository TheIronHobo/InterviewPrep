let cat = document.querySelector("#cat");
let hat = document.querySelector("#hat");
let wand = document.querySelector("#wand");

let angle = 0;
let lastTime = null;

let catDimensions = new Vector2(cat.width, cat.height);
let hatDimensions = new Vector2(hat.width, hat.height);

function animate(time) {
    if (lastTime != null) angle += (time - lastTime) * 0.001;
    lastTime = time;

    let catPosition = new Vector2(
        Math.cos(angle) * window.innerWidth/4 - catDimensions.x/2 + window.innerWidth/2,
        Math.sin(angle) * window.innerHeight/4 - catDimensions.y/2 + window.innerHeight/2
    )

    let hatPosition = new Vector2().add(catPosition);
    let defaultHatOffset = new Vector2(110, -40)
    let hatPositionDelta = new Vector2(0, Math.abs(Math.sin(angle*4)) * -30);
    let hatAngle = Math.cos(angle*2)*22;
    hatPosition = hatPosition.add(defaultHatOffset);
    hatPosition = hatPosition.add(hatPositionDelta);

    hat.style.transform = `rotate(${hatAngle}deg)`

    cat.style.left = catPosition.x + "px";
    cat.style.top = catPosition.y + "px";
    
    hat.style.left = hatPosition.x + "px";
    hat.style.top = hatPosition.y + "px";
    
    requestAnimationFrame(animate)
}

requestAnimationFrame(animate);
