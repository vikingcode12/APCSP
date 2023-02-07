//Code to war where it doesn't end until someone loses all the cards in their deck but the winner gets the loser's card so it takes forever...
var pDeck = [];
var rDeck = []
var pCard;
var rCard;
var totalCards = 52;
var pScore = 0;
var rScore = 0;
var tScore = 0;
var pCardi;
var rCardi;

const fillDecks =  () => {
    var cardnum = 0
    var val = 0

    for (let i = 0; i < totalCards; i++) {
         pDeck[i] = {
             dir: `/Cards/${cardnum}.jpg`,
             value: val,
             id: i
            }
            rDeck[i] = {
                dir: `/Cards/${cardnum}.jpg`,
                value: val,
                id: i+52
            }
            cardnum++
            val++
            if (val > 12) {
                val = 0
         }
    }
    
}

function playRound() {
    if(pDeck.length > 0 && rDeck.length > 0){

        pCardi = rand(pDeck.length);
        rCardi = rand(rDeck.length);
        var temp; 

        pCard = pDeck[pCardi]
        rCard = rDeck[rCardi]
        
        if (pDeck[pCardi].value > rDeck[rCardi].value){
            pScore++
            temp = rCardi
            pDeck.push(rDeck[rCardi])
            rDeck.splice(temp, 1)
        }
        else if (pDeck[pCardi].value < rDeck[rCardi].value){
            rScore++
            temp = pCardi
            rDeck.push(pDeck[pCardi])
            pDeck.splice(temp, 1)
        }
        else{
            tScore++
        }
        
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

fillDecks();
playRound();

const play = setInterval(() => {playRound()
    console.log(pCard, rCard)
}, 1)

//Start of the server

const express = require('express');
const port = 3000
const app = express();
var cors = require('cors')

var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors())

app.post('/war', (req, res) => {
    console.log(req)
    res.json({
        card1:pDeck[pCardi], 
        card2:rDeck[rCardi],
        player1: pScore,
        player2: rScore,
        ties: tScore,
        p1Deck: pDeck.length,
        p2Deck: rDeck.length
    })
})
app.get('/war', (req, res) => {
    res.json({
        card1:pDeck[pCardi], 
        card2:rDeck[rCardi],
        player1: pScore,
        player2: rScore,
        ties: tScore,
        p1Deck: pDeck.length,
        p2Deck: rDeck.length
    })
})

app.listen(port);
console.log(`Listening on port ${port}`);