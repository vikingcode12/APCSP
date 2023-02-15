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
    constructor(src, spW=64, spH=64, x = cWidth/2, y = 0, width = 15, height = 8.5) {

        this.scale = 1.5

        this.img = new Image();
        if(Array.isArray(src)){
            this.srcArray = src;
            this.img.src = path + src[0]
        }
        else this.img.src = path + src;
        
        this.offsetHeight = 0;
        this.offsetWidth = 20;
        
        this.x = x;
        this.y = y;
        
        this.velocity = [0, 0] // [vx, vy]
        this.maxSpeed = 10
        this.jumpForce = 10
        this.grounded = false;
        
        this.width = cWidth/width;
        this.height = cHeight/height;

        this.spriteWidth = spW;
        this.spriteHeight = spH;

        this.health = 100;

        this.maxFrameNum = 1
        this.frameNum = 0
        this.gameFrame = 0

        this.animation = 8-1

        this.alive = true;
        this.hurt = false;
        this.moving = false;
        this.attacking = false;
        this.falling = false;

    }


    update() {
        this.applyGravity()
        this.gameFrame++

        this.checkState()

        this.animate()
        
        this.x += this.velocity[0];
        this.y += this.velocity[1];
        if(this.y == cHeight - this.height) this.grounded = true
        else this.grounded = false

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
        ctx.drawImage(this.img, this.frameNum*this.spriteWidth, this.animation*this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x-this.offsetWidth, this.y+this.offsetHeight, this.spriteWidth*this.scale, this.spriteHeight*this.scale);

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
        this.velocity[1] = -this.jumpForce;
    }
}

export class purple_arrow extends fighter {
    constructor(src, spW=64, spH=64, x = cWidth/2, y = 0, width = 16, height = 9) {
        super(src, spW, spH, x, y, width, height)
        this.scale = 1.5
        
        this.offsetHeight = -5;
        this.offsetWidth = 20;
        
        
        this.maxSpeed = 10
        this.jumpForce = 10

        this.health = 100;

        this.maxFrameNum = 7
        this.frameNum = 0
        this.gameFrame = 0

        this.animation = 0

        this.alive = true;
        this.hurt = false;
        this.moving = false;
        this.attacking = false;
        this.falling = false;
    }

    checkState() {
        if(this.health > 0) this.alive = true
        if(this.velocity[1] != 0) this.falling = true
        else this.falling = false

    }

    animate(){


        // This is the general idea of animation
        if(this.gameFrame % staggerFrame != 0) return;
        this.frameNum++
        if (this.frameNum > this.maxFrameNum) {
            this.frameNum = 0
            if(this.falling) {
                let vy = this.velocity[1]
                if(vy <= 0 && this.animation != 6) {
                    this.animation = 6
                    this.
                }
                else if(vy >= 0 && this.animation!= 7) this.animation = 7
            }
        }
    }
}