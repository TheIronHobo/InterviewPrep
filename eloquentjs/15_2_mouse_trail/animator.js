function animator(animation) {
    let lastTime = null;
    let animationState = null;

    requestAnimationFrame(loop);
    
    function loop(time) {
        let deltaTime = time - lastTime;
        lastTime = time;
        
        animationState = animation([time, deltaTime], animationState);

        requestAnimationFrame(loop);
    }
}

export { animator }