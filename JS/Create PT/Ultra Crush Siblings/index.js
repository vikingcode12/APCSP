import { sleep } from "./utility.js";
import * as fighters from "./fighters.js"

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

var curkeys = []
var newkeys = [];

const testChar2 = new fighters.purple_arrow("purple_arrow/spritesheet.png")
const testChar = new fighters.warrior("warrior/spritesheet.png")

/**
 * Function that dictates movement of the player character based on user input
 */
function checkMovement(){
    if(curkeys[65]) testChar.moveX(-1)    
    else if(curkeys[68]) testChar.moveX(1)
    else testChar.moveX(0) 
    if(newkeys[32]) testChar.jump()
    else if (curkeys[74]) testChar.shield()
    else if(newkeys[75]) testChar.ability1()
    else if (newkeys[76]) testChar.ability2()
    if (!curkeys[74]) testChar.shielding = false
}

function update() {
    checkMovement()
    testChar.update()
    testChar2.update()


    for (let i = 0; i < newkeys.length; i++) {
        newkeys[i] = false;
    }
    setTimeout(() => {
        update();
    }, 1000 / tps);
}

function drawFrame(){
    // Clear the canvas each frame
    ctx.clearRect(0, 0, cWidth, cHeight);

    // testChar2.drawHitboxes(ctx);
    testChar.draw(ctx);
    testChar2.draw(ctx);

    requestAnimationFrame(drawFrame);
}

function init() {
    // This segment of code allows me to collect keyboard inputs from the user
    // Source: Teacher
    // Accessed on 2/9/23
    window.addEventListener('keydown', function(e){ if(!curkeys[e.keyCode]){
        curkeys[e.keyCode] = true; 
        newkeys[e.keyCode] = true;}})
        window.addEventListener('keyup', function(e){ curkeys[e.keyCode] = false;})
    
    ctx.imageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;



    console.log(c.width, c.height);
    update();
    drawFrame();
}

init();