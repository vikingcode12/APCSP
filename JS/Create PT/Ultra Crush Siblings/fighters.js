import {sleep} from "./utility.js" 

// Witch: https://9e0.itch.io/witches-pack
// Archer: https://astrobob.itch.io/arcane-archer
// Warrior: https://creativekind.itch.io/nightborne-warrior

function collides(enemy, range) {
    if (range.x < enemy.x + enemy.width && range.x + range.width > enemy.x && range.y < enemy.y + enemy.height && range.y + range.height > enemy.y) {
        return true;
    }
    return false;
}


/** @type {HTMLCanvasElement} */ 
const c = myCanvas;

const cWidth = c.offsetWidth; 
const cHeight = c.offsetHeight;

// Path for fighter assets
const path = "./assets/fighters/";

const gravity = 0.4;
const friction = 3;
const ground = 120;


const staggerFrame = 5;


const SHIELD = new Image()
SHIELD.src = "./assets/shield.png"

class projectile {
    /**
     * 
     * @param {HTMLImageElement} img 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} sx 
     * @param {Number} direction 
     */
    constructor(img, x=-800, y=500, sx=50, direction=1) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.speedX = sx;
        this.direction= direction;
    }

    /** 
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx){
        //No need to draw if it's off the screen
        if(this.x + this.img.width < -200 || this.x > cWidth - this.img.width + 200) return;

        if(this.direction == -1) {
            //This all essentially flips the image
            
            //Translates to the image position
            ctx.translate(this.x,this.y);
            
            // scaleX by -1; flip horizontally
            ctx.scale(-1,1);
            
            // draw the img
            // no need for x,y since we've already translated
            ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, -this.img.width, 0, this.img.width, this.img.height);
            
            // reset transformations to default
            ctx.setTransform(1,0,0,1,0,0);
        }
        else {
            ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
        }
    }

    update(){
        if(this.x + this.img.width < 0 || this.x > cWidth-this.img.width + 200) return;
        this.x += this.speedX * this.direction
    }
}


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

        this.shieldOffsetX = 0;
        this.offsetWidthY = 0;
        
        this.x = x;
        this.y = y;
        
        this.velocity = [0, 0] // [vx, vy]
        this.direction = 1;
        this.maxSpeed = 10
        this.jumpForce = 10
        this.grounded = false;
        this.hasDoubleJump = true
        
        this.width = cWidth/width;
        this.height = cHeight/height;

        this.spriteWidth = spW;
        this.spriteHeight = spH;

        this.damage = 0;

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
        if(this.y == cHeight - ground - this.height) this.grounded = true
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
        if(this.direction == -1) {
            //This all essentially flips the image
    
            //Translates to the images position
            ctx.translate(this.x,this.y);
            // scaleX by -1; this "trick" flips horizontally
            ctx.scale(-1,1);
            
            // draw the img
            // no need for x,y since we've already translated
            ctx.drawImage(this.img, (this.frameNum-1)*this.spriteWidth, (this.animation-1)*this.spriteHeight, this.spriteWidth, this.spriteHeight, -this.spriteWidth-this.offsetWidth, this.offsetHeight, this.spriteWidth*this.scale, this.spriteHeight*this.scale);
            
            // always clean up -- reset transformations to default
            ctx.setTransform(1,0,0,1,0,0);
        }
        else {
            ctx.drawImage(this.img, (this.frameNum-1)*this.spriteWidth, (this.animation-1)*this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x-this.offsetWidth, this.y+this.offsetHeight, this.spriteWidth*this.scale, this.spriteHeight*this.scale);
        }
        if(this.shielding){
            ctx.drawImage(SHIELD, this.x-this.shieldOffsetX, this.y-this.shieldOffsetY, this.width, this.height);
        }
    }

    applyGravity(){
        if( this.y < cHeight-ground - this.height) this.velocity[1] += gravity;
        else {
            if(this.x + this.velocity[0] < 0 || this.x + this.width + this.velocity[0] > cWidth) {
                this.velocity[1] += gravity;
                return
            }
            if(this.velocity[1] > 0){
                this.velocity[1] = 0;
                this.y = cHeight - ground-this.height;
                this.hasDoubleJump = true;
            }
        }
    }

    shield() {
        if(!this.grounded || this.attacking) return
        this.velocity[0] = 0 
        this.shielding = true
    }
    
    /**
     * Function to control the fighters movement
     * 
     * @param {Number} direction 1, -1 or 0
     */
    moveX(direction = 0) {
        if (direction != 0){
            this.direction = direction;
        }
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
        
        
    }
    
    jump() {
        if(!this.grounded && !this.hasDoubleJump || this.shielding || this.attacking) return
        if(this.hasDoubleJump && !this.grounded) this.hasDoubleJump = false
        this.velocity[1] = -this.jumpForce;
    }
}

export class purple_arrow extends fighter {
    constructor(src, spW=64, spH=64, x = cWidth/2, y = 0, width = 16, height = 9) {
        super(src, spW, spH, x, y, width, height)
        this.scale = 1.5
        
        this.arrow_img = new Image()
        this.arrow_img.src = "./assets/fighters/purple_arrow/projectile.png"

        this.offsetHeight = -5;
        this.offsetWidth = 20;
        
        
        this.maxSpeed = 15
        this.jumpForce = 10
        
        
        this.maxFrameNum = 7
        this.frameNum = 0
        this.gameFrame = 0
        
        this.animation = 0
        
        this.alive = true;
        this.hurt = false;
        this.moving = false;
        this.attacking = false;
        this.falling = false;
        this.shielding = false;
        this.volatile = false;
     
        this.arrow = new projectile(this.arrow_img,)
    }


    /**
     * Draw the fighter on the canvas
     *  
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        if((this.direction == -1 && this.animation!= 5) || (this.direction == 1 && this.animation == 5)) {
            //This all essentially flips the image
            
            //Translates to the image position
            ctx.translate(this.x,this.y);
            
            // scaleX by -1; flip horizontally
            ctx.scale(-1,1);
            
            // draw the img
            // no need for x,y since we've already translated
            ctx.drawImage(this.img, (this.frameNum-1)*this.spriteWidth, (this.animation-1)*this.spriteHeight, this.spriteWidth, this.spriteHeight, -this.spriteWidth-this.offsetWidth, this.offsetHeight, this.spriteWidth*this.scale, this.spriteHeight*this.scale);

            // always clean up -- reset transformations to default
            ctx.setTransform(1,0,0,1,0,0);
        }
        else if ((this.direction == 1 && this.animation!= 5) || (this.direction == -1 && this.animation == 5)) {
            ctx.drawImage(this.img, (this.frameNum-1)*this.spriteWidth, (this.animation-1)*this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x-this.offsetWidth, this.y+this.offsetHeight, this.spriteWidth*this.scale, this.spriteHeight*this.scale);
        }
        if(this.shielding){
            ctx.drawImage(SHIELD, this.x-this.offsetWidth/4, this.y-this.offsetHeight, this.width, this.height);
        }
        this.arrow.draw(ctx)
    }

    update() {
        this.applyGravity()
        this.gameFrame++


        this.checkState()

        this.animate()
        
        this.x += this.velocity[0];
        this.y += this.velocity[1];
        if(this.y == cHeight - ground - this.height) this.grounded = true
        else this.grounded = false

        this.arrow.update()
    }

    ability1() {
        if(this.attacking) return
        this.velocity[0] = 0
        this.attacking = "ability1"
        this.frameNum = 1
        sleep(900).then(() => {
            this.arrow = new projectile(this.arrow_img, this.x, this.y+this.height/2, 60, this.direction)
            this.attacking = false
        })
    }
    
    ability2() {
        if(this.attacking) return
        this.velocity[0] = this.velocity[0] * 1.5
        this.attacking = "ability2"
        this.frameNum = 1
        this.maxSpeed = 20
        this.moveX(this.direction)
        sleep(1000).then(() => {
            this.attacking = false
            this.maxSpeed = 10
        })

    }


    checkState() {
        for (let i = 0; i < 4; i++) {
            if(this.attacking == "ability2") this.moveX(this.direction)
        }
        if(this.attacking == "ability1") this.velocity[0] = 0
        if(this.damage > 99) this.volatile = true

    }

    // Code to manage current animation and animation frame.
    // Author: Me
    // Source: characters.js 
    // Accessed on 2/16/23
    animate(){
         //Staggers the frames so the animations don't play too fast
         if(this.gameFrame % staggerFrame != 0) return;
         //Animates next frame if there is another frame otherwise start over from first frame
         if(this.frameNum < this.maxFrameNum) this.frameNum++;
         else{
             //Checks if the character lost because then there is no need to update animations
             if(!this.alive) return;
             this.frameNum = 1
         }
         //Eveything below handles a majority of the animation logic
 
         //Checks if the conditions are met runs the animation then returns otherwise 
         if(this.health <= 0){
             if(!this.alive) this.frameNum = 0;
             this.animation = 2;
             this.totalFrames = 8;
             this.alive = false;
             return
         }
         //Attacked Animations
         else if(this.hurt){
             this.totalFrames = 3;
             this.animation = 15;
             if(this.frameNum == this.totalFrames) this.hurt = false;
             return
         }
         
         if(this.attacking) {
            if (this.attacking == "ability1") {
                this.animation = 4
                this.maxFrameNum = 7
            }
            else if (this.attacking == "ability2") {
                this.animation = 3
                this.maxFrameNum = 7
                this.velocity[0] = this.velocity[0] * 1.5
            }
            if(this.frameNum == this.damageFrame){
                if(this.isPlayer) this.attackLogicPlayer()
                else this.attackLogicCPU()
                if(this.currentAttack == 1) this.damageFrame = 5;
            }
            if(this.frameNum == this.totalFrames) {
                if(this.currentAttack == 1) {
                    util.sleep(400).then(() => {
                        this.canAttack1 = true;
                    })
                }
                else if(this.currentAttack == 2) {
                    util.sleep(1700).then(() => {
                        this.canAttack2 = true;
                    })
                }
                    this.attacking = false;
                    this.currentAttack = 0;
             }
             return;
         }
         
         else if(!this.grounded){
            let vy = this.velocity[1]
            if(vy <= 0 && this.animation != 7) {
                this.animation = 7
                this.maxFrameNum = 4
            }
            else if(vy > 0 && this.animation!= 5) {
                this.animation = 5
                this.maxFrameNum = 2
                if(this.frameNum > this.maxFrameNum) this.frameNum = 1
            }
            if(this.frameNum > this.maxFrameNum) this.frameNum = 1
            return
         }
         
         else if(this.velocity[0] != 0){
             this.animation = 1;
             this.maxFrameNum = 8;
             if(this.frameNum > this.maxFrameNum) this.frameNum = 1
             return
            }
            
            else{
             this.animation = 6
             this.maxFrameNum = 4;
             if(this.frameNum > this.maxFrameNum) this.frameNum = 1
             return;
         }
    }
}

export class warrior extends fighter {
    constructor(src, spW=80, spH=80, x = cWidth/2, y = 0, width = 16, height = 9) {
        super(src, spW, spH, x, y, width, height)
        this.scale = 2

        this.offsetHeight = -57;
        this.offsetWidth = 40;
        
        this.shieldOffsetX = 40;
        this.shieldOffsetY = -57;
        
        this.maxSpeed = 10
        this.jumpForce = 10
        
        
        this.maxFrameNum = 7
        this.frameNum = 0
        this.gameFrame = 0
        
        this.animation = 0
        
        this.alive = true;
        this.hurt = false;
        this.moving = false;
        this.attacking = false;
        this.falling = false;
        this.shielding = false;
        this.volatile = false;
     
    }


    ability1() {
        if(this.attacking) return
        this.velocity[0] = 0
        this.attacking = "ability1"
        this.frameNum = 1
        sleep(1400).then(() => {
            console.log("done")
            this.attacking = false
        })
    }
    
    ability2() {
        if(this.attacking) return
        this.velocity[0] = this.velocity[0] * 1.5
        this.attacking = "ability2"
        this.frameNum = 1
        this.maxSpeed = 20
        console.log(this.direction)
        this.moveX(this.direction)
        sleep(500).then(() => {
            this.attacking = "ability1"
            this.frameNum = 10
            this.maxSpeed = 10
            sleep(500).then(this.attacking = false)
        })

    }


    checkState() {
        for (let i = 0; i < 4; i++) {
            if(this.attacking == "ability2") this.moveX(this.direction)
        }
        if(this.attacking == "ability1") this.velocity[0] = 0
        if(this.damage > 99) this.volatile = true

    }

    // Code to manage current animation and animation frame.
    // Author: Me
    // Source: characters.js 
    // Accessed on 2/16/23
    animate(){
         //Staggers the frames so the animations don't play too fast
         if(this.gameFrame % staggerFrame != 0) return;
         //Animates next frame if there is another frame otherwise start over from first frame
         if(this.frameNum < this.maxFrameNum) this.frameNum++;
         else{
             //Checks if the character lost because then there is no need to update animations
             if(!this.alive) return;
             this.frameNum = 1
         }
         //Eveything below handles a majority of the animation logic
 
         //Checks if the conditions are met runs the animation then returns otherwise 
         if(this.health <= 0){
             if(!this.alive) this.frameNum = 0;
             this.animation = 2;
             this.totalFrames = 8;
             this.alive = false;
             return
         }
         //Attacked Animations
         else if(this.hurt){
             this.totalFrames = 3;
             this.animation = 15;
             if(this.frameNum == this.totalFrames) this.hurt = false;
             return
         }
         
         if(this.attacking) {
            if (this.attacking == "ability1") {
                this.animation = 3
                this.maxFrameNum = 12
            }
            else if (this.attacking == "ability2") {
                this.animation = 3
                this.maxFrameNum = 7
                this.velocity[0] = this.velocity[0] * 1.5
            }
            if(this.frameNum == this.damageFrame){
                if(this.isPlayer) this.attackLogicPlayer()
                else this.attackLogicCPU()
                if(this.currentAttack == 1) this.damageFrame = 5;
            }
            if(this.frameNum == this.totalFrames) {
                if(this.currentAttack == 1) {
                    util.sleep(400).then(() => {
                        this.canAttack1 = true;
                    })
                }
                else if(this.currentAttack == 2) {
                    util.sleep(1700).then(() => {
                        this.canAttack2 = true;
                    })
                }
                    this.attacking = false;
                    this.currentAttack = 0;
             }
             return;
         }
         
         else if(!this.grounded){
            let vx = this.velocity[0]
            this.animation = 2
            this.maxFrameNum = 6
            if (vx == 0) {
                this.animation = 1
                this.maxFrameNum = 9
            } 
            if(this.frameNum > this.maxFrameNum) this.frameNum = 1
            return
         }
         
         else if(this.velocity[0] != 0){
             this.animation = 2;
             this.maxFrameNum = 6;
             if(this.frameNum > this.maxFrameNum) this.frameNum = 1
             return
            }
            
            else{
             this.animation = 1
             this.maxFrameNum = 9;
             if(this.frameNum > this.maxFrameNum) this.frameNum = 1
             return;
         }
    }
}
