/** @type {HTMLCanvasElement} */ 
const c = myCanvas;

const cWidth = c.offsetWidth; 
const cHeight = c.offsetHeight;

// Path for fighter assets
const path = "./assets/fighters/";

const gravity = 0.4;





export class fighter {
    constructor(src, x = cWidth/2, y = 0, width = cWidth/17.58, height = cHeight/6.25) {

        this.src = path + src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.health = 100;
        this.velocity = [0, 0] // [vx, vy]
    }


    update() {
        if( this.y < cHeight - this.height) this.velocity[1] += gravity;
        else {
            this.velocity[1] = 0;
            this.y = cHeight-this.height;

        }
        console.log(this.velocity);

        this.moveX();

        this.x += this.velocity[0];
        this.y += this.velocity[1];
    }

    /**
     * Draw the fighter on the canvas
     *  
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawHitboxes(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    /**
     * 
     * @param {Number} direction 1, -1 or 0
     */
    moveX(direction = 0) {
        this.velocity[0] = direction * 2;
    }
}