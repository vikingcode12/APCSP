// initialize global variables here
var p1Deck = [], p2Deck = [], 
p1Index, p2Index, 
p1CurrCard, p2CurrCard, 
deckMax = 8,
monsterArray = ["'./Monster Pics/monster1.svg'", "'./Monster Pics/monster2.svg'", "'./Monster Pics/monster3.svg'", "'./Monster Pics/monster4.svg'"],
// -1 is gameover, 0 is playing, 1 is win, .5 is pause
gameState = -1,
score = 0;		


		// Function that generates a random number
        // From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        function randInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
        }

		// Format Cards
        function formatCard(deck ,i) {
            return `<img src=${deck[i]} width=300 height=300>`
        }

		// write a function that displays instructions
        function displayInstructions() {
            idInstructions.innerHTML = "When there is a match press y if there is no match press n. <br> Press space after guessing to get the next card. <br> (Be sure to click off the button after starting as pressing space will start a new game if you don't)"
        }
		// write a function that displays scores
        function displayScore() {
            idScore.innerHTML = `Score ${score}`
        }
		
		// write a function that deals new cards
        function dealCards() {
            if(checkWin()) return
            if(gameState != 0) gameState = 0
            p1Index = randInt(0, p1Deck.length - 1)
            p2Index = randInt(0, p2Deck.length - 1)
            console.log(p1Index,p2Index)
            p1CurrCard = p1Deck[p1Index]
            p2CurrCard = p2Deck[p2Index]
            console.log(p1CurrCard,p2CurrCard)
            idImage1.innerHTML = p1CurrCard 
            idImage2.innerHTML = p2CurrCard
            displayInstructions()
            displayScore()
        }
		
		// write a function that starts a new game of Monster Match
		function newGame() {
            score = 0;
            gameState = 0;
            idPlayer1.innerHTML = "Player 1"
            idPlayer2.innerHTML = "Player 2"
            p1Deck = []
            p2Deck = []
            for (let i = 0; i < deckMax; i++) {
                let j = randInt(0, monsterArray.length - 1)
                let k = randInt(0, monsterArray.length - 1)
                p1Deck[i] = formatCard(monsterArray, j);
                p2Deck[i] = formatCard(monsterArray, k);
            }
            dealCards()
            idGameMsgs.innerHTML = 'Match or Pass?'
        }
        
		// write a function that check for a winner
        function checkWin() {
            if (score < 10) return false
            gameState = -1;
            idGameMsgs.innerHTML = "Congratulations You Win! <br> Press Start New Game to start a new game."
            return true;
        }
        
		// write a checkMatch(event) function
        function checkMatch(e) {
            if(checkWin()) return
            else if(gameState != 0 && gameState != .5) return
            if(gameState == .5 && e.keyCode == 32){
                idGameMsgs.innerHTML = 'Match or Pass?'
                gameState = 0;
                return dealCards();
            }
            else if (gameState == .5) return
            if(e.keyCode == 89 && p1CurrCard == p2CurrCard) {
                score++
                idGameMsgs.innerHTML = "Nice Job!"
                gameState = .5;
            }
            else if(e.keyCode == 89) {
                score--
                idGameMsgs.innerHTML = "Oops That's Not Right!"
                gameState = .5;
            }
            if(e.keyCode == 78 && p1CurrCard != p2CurrCard) {
                score++
                idGameMsgs.innerHTML = "Nice Job!"
                gameState = .5;
            }
            else if (e.keyCode == 78){
                score--
                idGameMsgs.innerHTML = "Oops That's Not Right!"
                gameState = .5;
            }
            if(e.keyCode != 89 && e.keyCode != 78){
                idGameMsgs.innerHTML = "Looks like you pressed an invalid key! <br> Press ‘Y’ if matching or ‘N’ if not matching"
            }
            displayScore();
        }