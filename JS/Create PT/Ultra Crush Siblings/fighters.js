/** @type {HTMLCanvasElement} */ 
const c = myCanvas;

const cWidth = c.offsetWidth; 
const cHeight = c.offsetHeight;

// Path for fighter assets
const path = "./assets/fighters/";

const gravity = 0.4;
const friction = 3;




// General fighter class the other fighters will inherit
export class fighter {
    /**
     * Contructs the fighter object
     * 
     * @param {String} src 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} width 
     * @param {Number} height 
     */
    constructor(src, x = cWidth/2, y = 0, width = 17.58, height = 6.25) {

        this.src = path + src;
        this.x = x;
        this.y = y;
        this.width = cWidth/width;
        this.height = cHeight/height;
        this.health = 100;
        this.velocity = [0, 0] // [vx, vy]
        this.maxSpeed = 10
        this.grounded = false;
    }


    update() {
        if( this.y < cHeight - this.height) this.velocity[1] += gravity;
        else {
            if(this.velocity[1] > 0){
                this.velocity[1] = 0;
                this.y = cHeight-this.height;
            }

        }
        
        this.x += this.velocity[0];
        this.y += this.velocity[1];
        if(this.y == cHeight - this.height) this.grounded = true
        else this.grounded = false
        console.log(this.grounded)
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
     * Function to control the fighters movement
     * 
     * @param {Number} direction 1, -1 or 0
     */
    moveX(direction = 0) {
        if(direction == 0) {
            // Apply friction to slow the fighter in a sort of natural way
            if(this.velocity[0] == 1 || this.velocity[0] == -1) this.velocity[0] = 0
            if(this.velocity[0] > 0) this.velocity[0] -= friction
            else if(this.velocity[0] < 0) this.velocity[0] += friction
        }

        if (direction == 1 && this.velocity[0] < 0) this.velocity[0] = 0 
        else if (direction == -1 && this.velocity[0] > 0) this.velocity[0] = 0

        this.velocity[0] += direction * 1;
        
        if(this.velocity[0] > this.maxSpeed) this.velocity[0] = this.maxSpeed;
        else if(this.velocity[0] < -this.maxSpeed) this.velocity[0] = -this.maxSpeed;
        
        if(this.x + this.velocity[0] < 0) {
            this.velocity[0] = 0
            this.x = 0
        }
        else if(this.x + this.width + this.velocity[0] > cWidth) {
            this.velocity[0] = 0
            this.x = cWidth-this.width
        }
    }

    jump() {
        if(!this.grounded) return
        this.velocity[1] = -10;
    }
}