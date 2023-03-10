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

export var cpu = new fighters.purple_arrow("purple_arrow/spritesheet.png", false)
export var player = new fighters.warrior("warrior/spritesheet.png", true)

var pLives = 3;
var cLives = 3;


const bg = new Image() //   https://ansimuz.itch.io/bulkhead-walls-environment
bg.src = "./assets/bulkhead-wallsx3.png"

function drawText(text, x=cWidth/2, y=cHeight/2, size=100, color="white", xAlign="center", yAlign="middle") {
    ctx.fillStyle = color
    ctx.textAlign = xAlign
    ctx.textBaseline = yAlign
    ctx.font = `${size}px ssbu`
    text = formatText(text)
    ctx.fillText(text, cWidth/2, cHeight/2-160)
}

function formatText(text) {
    let outputString = ""
    for (let i = 0; i < text.length; i++) {
        if(text[i] == " ") {
            outputString += "  ";
            continue;
        }
        outputString += text[i] + " ";
    }
    return outputString;
}



/**
 * Function that dictates movement of the player character based on user input given through currkeys array and newkeys array
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

/**
 * Function that updates the game state
 */
function update() {
    checkMovement()
    player.update()
    if (!player.alive && player.lives-1 > 0) {
        player = new fighters.warrior("warrior/spritesheet.png", true);
        pLives -= 1;
        player.lives = pLives;
    }
    else if (!player.alive) player.lives = 0

    if (!cpu.alive && player.lives-1 > 0) {
        cpu = new fighters.purple_arrow("purple_arrow/spritesheet.png", false)
        cLives -= 1;
        cpu.lives = cLives;
    }
    else if (!cpu.alive) cpu.lives = 0
    cpu.update()


    for (let i = 0; i < newkeys.length; i++) {
        newkeys[i] = false;
    }
    setTimeout(() => {
        update();
    }, 1000 / tps);
}

/**
 * Function that draws the game state
 */
function drawFrame(){
    // Clear the canvas each frame
    ctx.clearRect(0, 0, cWidth, cHeight);

    ctx.drawImage(bg, 0, 0, cWidth, cHeight)

    player.draw(ctx);
    cpu.draw(ctx);

    if(!cpu.alive && cpu.lives-1 <= 0 ) {
        drawText("you win")
    }

    if(!player.alive && player.lives-1 <= 0) {
        drawText("you lose")
    }

    requestAnimationFrame(drawFrame);
}

/**
 * Function that initializes the game
 */
function init() {
    // This segment of code allows me to collect keyboard inputs from the user
    // Source: Teacher
    // Accessed on 2/9/23
    window.addEventListener('keydown',
    /**
     * Function that takes the event and updates the keys being pressed down
     * @param {Event} e 
     */
    function(e){ if(!curkeys[e.keyCode]){
        curkeys[e.keyCode] = true; 
        newkeys[e.keyCode] = true;}})
        window.addEventListener('keyup', 
        /**
         * Function that takes the event and updates the keys being pressed down
        * @param {Event} e 
        */
        function(e){ curkeys[e.keyCode] = false;
            if (e.keyCode == 65 || e.keyCode == 68) {
                player.velocity[0] = 0;
            }
        })
    

    ctx.imageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;



    update();
    drawFrame();
}

init();

