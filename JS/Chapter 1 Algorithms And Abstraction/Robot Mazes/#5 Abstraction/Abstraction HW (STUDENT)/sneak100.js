function win() {
    moveForward();
	rotateLeft();
    for(var i = 0; i < 4; i++) {
        while(canMove('forward')) {
            moveForward();
        }
        roundAbout();
    }
    move(2);
}

function move(num){
    if (!num) return console.error("Invalid number passed to move function"); // Handling if they leave num blank
    for(let i = 0; i < num; i++){ 
        moveForward();
    }

}

function roundAbout(){
    for(let i = 0; i < 3; i++){ 
        rotateRight()
        move(2)
    }
}