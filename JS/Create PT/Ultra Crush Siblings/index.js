import { sleep } from "./utility.js";
import * as fighters from "./fighters.js"

class GAME {
    constructor(ctx=ctx, width=cWidth, height=cHeight) {

    }

}

/** @type {HTMLCanvasElement} */ 
const c = myCanvas;

// Get the dimensions of the canvas
const cWidth = c.offsetWidth; 
const cHeight = c.offsetHeight;
// Update this to match the CSS width and height of the canvas
c.width = cWidth;
c.height = cHeight;
const ctx = c.getContext("2d");
// Control how often the game updates so there won't be an issue on high refresh rate monitors
const tps = 60

const testChar = new fighters.fighter("test")

function update() {
    testChar.update()


    setTimeout(() => {
        update();
    }, 1000 / tps);
}

function drawFrame(){
    // Clear the canvas each frame
    ctx.clearRect(0, 0, cWidth, cHeight);

    testChar.drawHitboxes(ctx);

    requestAnimationFrame(drawFrame);
}

function init() {
    // CITATION
    // Source: Teacher
    window.addEventListener('keydown', function(e){ if(!curkeys[e.keyCode]){
        curkeys[e.keyCode] = true; 
        newkeys[e.keyCode] = true;}})
        window.addEventListener('keyup', function(e){ curkeys[e.keyCode] = false;})
        
    console.log(c.width, c.height);
    update();
    drawFrame();
}
