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

export const cpu = new fighters.purple_arrow("purple_arrow/spritesheet.png", false)
export const player = new fighters.warrior("warrior/spritesheet.png", true)


const bg = new Image() //   https://ansimuz.itch.io/bulkhead-walls-environment
bg.src = "./assets/bulkhead-wallsx3.png"

/**
 * Function that dictates movement of the player character based on user input
 */
function checkMovement(){
    if(curkeys[65]) player.moveX(-1)    
    else if(curkeys[68]) player.moveX(1)
    else player.applyFriction()
    if(newkeys[32]) player.jump()
    else if (curkeys[74]) player.shield()
    else if(newkeys[75]) player.ability1()
    else if (newkeys[76]) player.ability2()
    if (!curkeys[74]) player.shielding = false
}

function update() {
    checkMovement()
    player.update()
    cpu.update()
    // console.log(cpu.damage)


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

    ctx.drawImage(bg, 0, 0, cWidth, cHeight)

    player.draw(ctx);
    cpu.draw(ctx);

    requestAnimationFrame(drawFrame);
}

function init() {
    // This segment of code allows me to collect keyboard inputs from the user
    // Source: Teacher
    // Accessed on 2/9/23
    window.addEventListener('keydown', function(e){ if(!curkeys[e.keyCode]){
        curkeys[e.keyCode] = true; 
        newkeys[e.keyCode] = true;}})
        window.addEventListener('keyup', function(e){ curkeys[e.keyCode] = false;
            if (e.keyCode == 65 || e.keyCode == 68) {
                player.velocity[0] = 0;
            }
        })
    

    ctx.imageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;



    // console.log(c.width, c.height);
    update();
    drawFrame();
}

init();