// Witch: https://9e0.itch.io/witches-pack


/** @type {HTMLCanvasElement} */ 
const c = myCanvas;

const cWidth = c.offsetWidth; 
const cHeight = c.offsetHeight;

// Path for fighter assets
const path = "./assets/fighters/";

const gravity = 0.4;
const friction = 3;
const ground = 0


const staggerFrame = 5;



// General fighter class the other fighters will inherit
export class fighter {
    /**
     * Contructs the fighter object
     * 
     * @param {*} src This can be an array or a string depending on the sprite sheet given
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} width 
     * @param {Number} height 
     */
    constructor(src, spW=32, spH=48, x = cWidth/2, y = 0, width = 17.58, height = 6.25) {

        this.img = new Image();
        if(Array.isArray(src)){
            this.srcArray = src;
            this.img.src = path + src[0]
        }
        else this.img.src = path + src;
        
        this.x = x;
        this.y = y;
        
        this.velocity = [0, 0] // [vx, vy]
        this.maxSpeed = 10
        this.grounded = false;
        
        this.width = cWidth/width;
        this.height = cHeight/height;

        this.spriteWidth = spW;
        this.spriteHeight = spH;

        this.health = 100;

        this.maxFrameNum = 5
        this.frameNum = 0
        this.gameFrame = 0
    }


    update() {
        this.applyGravity()
        this.gameFrame++

        this.animate()
        
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
     * Draw the fighter on the canvas
     *  
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.drawImage(this.img, 0, this.frameNum*this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width*1.5, this.height);

    }

    animate(){


        // This is the general idea of animation
        if(this.gameFrame % staggerFrame != 0) return;
        this.frameNum++
        if (this.frameNum > this.maxFrameNum) this.frameNum = 0
    }

    applyGravity(){
        if( this.y < cHeight - this.height) this.velocity[1] += gravity;
        else {
            if(this.velocity[1] > 0){
                this.velocity[1] = 0;
                this.y = cHeight-this.height;
            }
        }
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
