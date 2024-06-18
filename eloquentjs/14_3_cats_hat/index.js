const cat = document.querySelector("#cat");
const hat = document.querySelector("#hat");
const wand = document.querySelector("#wand");

let angle = 0;
let lastTime = null;

function animate(time) {
    // Time management
    let deltaTime = time - lastTime
    if (lastTime !== null) {
        angle += deltaTime * 0.001
    };
    lastTime = time;

    // Cat transforms
    const catPosition = new Vector2(
        Math.cos(angle) * window.innerWidth/4 - cat.width/2 + window.innerWidth/2,
        Math.sin(angle * 2) * window.innerHeight/4 - cat.height/2 + window.innerHeight/2)

    cat.style.transform = `translate(${catPosition.x}px, ${catPosition.y}px)`

    // Hat transforms
    const defaultHatOffset = new Vector2(110, -40);
    const hatPositionAnim = new Vector2(0, Math.abs(Math.sin(angle * 4)) * -30);
    const hatPosition = catPosition.add(defaultHatOffset).add(hatPositionAnim);
    const hatAngleAnim = Math.cos(angle * 2) * 22;

    hat.style.transform = `
        translate(${hatPosition.x}px, ${hatPosition.y}px)
        rotate(${hatAngleAnim}deg)`

    // Wand transforms
    const defaultWandOffset = new Vector2(180, 90);
    const wandPosition = catPosition.add(defaultWandOffset);
    const wandAngleAnim = Math.sin(angle * 4) * 44;

    wand.style.transform = `
        translate(${wandPosition.x}px, ${wandPosition.y}px)
        rotate(${wandAngleAnim}deg)`

    // Sparkle spawning
    if (Math.floor(time) % 5 === 0) {
        const sparkle = document.createElement('img');

        sparkle.src = "img/sparkle.png";
        sparkle.style = `
            position: absolute;
            z-index: -1;
            filter: hue-rotate(${Math.random() * 360}deg)`;
        const sparkleDefaultPosition = new Vector2(-20, -150);
        const positionVariance = 32;
        const randomOffset = new Vector2(Math.random()*positionVariance - positionVariance/2, Math.random()*positionVariance - positionVariance/2)

        sparkle.position = wandPosition.add(sparkleDefaultPosition).add(randomOffset);
        sparkle.className = `sparkle`;
        sparkle.ttl = 1500;

        document.body.appendChild(sparkle);
    }

    // Sparkle management
    const sparkles = document.getElementsByClassName("sparkle");

    for (const sparkle of sparkles) {
        sparkle.ttl -= deltaTime;

        if (sparkle.ttl <= 0) {
            document.body.removeChild(sparkle);
            continue;
        }

        sparkle.style.transform = `
            translate(${sparkle.position.x + 100}px, ${sparkle.position.y + 100}px)
            rotate(${(angle*300)}deg)`;
    }
    
    requestAnimationFrame(animate)
}

requestAnimationFrame(animate);
