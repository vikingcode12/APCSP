function win() {
    while(!goalReached()) {
        if(canMove('left')) {
            rotateLeft();
        }
        else if(canMove('right')) {
            rotateRight();
        }
        if(canMove('forward')) {
            moveForward();
        }
    }
}