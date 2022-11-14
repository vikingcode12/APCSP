//Code to war where it doesn't end until someone loses all the cards in their deck but the winner gets the loser's card so it takes forever...
var pDeck = [];
var rDeck = []
var pCard;
var rCard;
var totalCards = 52;
var pScore = 0;
var rScore = 0;
var tScore = 0;
var on = false;
var sim; 

window.onload = () =>{
    var cardnum = 0
    var val = 2

    pCard = idPlayerCard
    rCard = idRoboCard

    for (let i = 0; i <=51; i++) {
         pDeck[i] = {
             dir: `./Cards/${cardnum}.jpg`,
             value: val
         }
         rDeck[i] = {
            dir: `./Cards/${cardnum}.jpg`,
            value: val
        }
         cardnum++
         val++
         if (val > 14) {
             val = 2
         }
    }
    
}

function playRound() {
    if(pDeck.length > 0 && rDeck.length > 0){

        var pCardi = rand(pDeck.length);
        var rCardi =rand(rDeck.length);
        var temp; 

        pCard.src = pDeck[pCardi].dir
        rCard.src = rDeck[rCardi].dir
    
        if (pDeck[pCardi].value > rDeck[rCardi].value){
            idOutcome.innerHTML = `You Won!`;
            pScore++
            temp = rCardi
            pDeck.push(rDeck[rCardi])
            rDeck.splice(temp, 1)
        }
        else if (pDeck[pCardi].value < rDeck[rCardi].value){
            idOutcome.innerHTML = `The Computer Won!`;
            rScore++
            temp = pCardi
            rDeck.push(pDeck[pCardi])
            pDeck.splice(temp, 1)
        }
        else{
            idOutcome.innerHTML = 'You Tied!';
            tScore++
        }

        idScore.innerHTML = `Your Score: ${pScore}<br> Robot's Score ${rScore}<br> Ties: ${tScore}`
        idCards.innerHTML = `Player Cards: ${pDeck.length} Robo Cards: ${rDeck.length}`
    }
    else{
        var winner;
        if (pScore > rScore) {
            winner = 'You Win!'
        }
        else if (rScore > pScore) {
            winner = 'The Robot Wins!'
        }
        else {
            winner = 'You Tied!'
        }
        alert(`Game Over! ${winner} Please press \'R\' to restart!`)
    }

}

function rand(length) {
        return Math.floor(Math.random() * length);
}

function reset() {
    totalCards = 52
    pCard.src = './Cards/def.png'
    rCard.src = './Cards/def.png'
    idScore.innerHTML = ''
    idOutcome.innerHTML = ''
    pScore = 0
    rScore = 0
    alert('Reset!')
}

function autoClick() {
    on = !on
    if(on) return sim = setInterval(() => {if(on && pDeck.length > 0 && rDeck.length > 0){playRound()}}, 100);
    else clearInterval(sim)
        
}
        

