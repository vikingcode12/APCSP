/** @type {HTMLCanvasElement} */ 
const c = myCanvas;

// Get canvas context
const cWidth = c.offsetWidth; 
const cHeight = c.offsetHeight; 
const ctx = c.getContext("2d");
// Control how often the game updates so there won't be an issue on high refresh rate monitors
const fps = 60 

function update() {

    setTimeout(() => {
        update();
    }, 1000 / tps);
}

function drawFrame(){
    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.fillRect(0, 0, cWidth, cHeight);
    requestAnimationFrame(drawFrame);
}

update();
drawFrame();