import { sleep } from "./utility.js";

class GAME {
    constructor(ctx=ctx, width=cWidth, height=cHeight) {

    }

}

/**
 * Function that gets a random int inclusive of min and max
 * 
 * Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * Accessed on 12/19/22
 * 
 * @param {number} min 
 * @param {number} max 
 * @returns {integer}
 */
function getRandInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

/** @type {HTMLCanvasElement} */ 
const c = myCanvas;

const cWidth = c.offsetWidth; 
const cHeight = c.offsetHeight;
// Update this to match the CSS width and height of the canvas
c.width = cWidth;
c.height = cHeight;
const ctx = c.getContext("2d");
// Control how often the game updates so there won't be an issue on high refresh rate monitors
const tps = 2

function update() {
    let r = getRandInt(0, 255);
    let g = getRandInt(0, 255);
    let b = getRandInt(0, 255);
    
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    setTimeout(() => {
        update();
    }, 1000 / tps);
}

function drawFrame(){
    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.fillRect(0, 0, cWidth-100, cHeight);
    requestAnimationFrame(drawFrame);
}

console.log(c.width, c.height);
update();
drawFrame();