// initialize global variables here
var p1Deck = [], p2Deck = [], 
p1Index, p2Index, 
p1CurrCard, p2CurrCard, 
deckMax = 8,
monsterArray = ["'./Monster Pics/monster1.svg'", "'./Monster Pics/monster2.svg'", "'./Monster Pics/monster3.svg'", "'./Monster Pics/monster4.svg'"],
// -1 is gameover, 0 is playing, 1 is win, .5 is pause
gameState = -1,
score = 0,
toggle = false;		


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

        function toggleInstructions() {
            toggle = !toggle
            displayInstructions()
        }

		// write a function that displays instructions
        function displayInstructions() {
            if(!toggle) return idInstructions.innerHTML = ""
            idInstructions.innerHTML = "<inst>Welcome to Monster Match! <br> When matching matches show up press your respective <br> button to confirm a match <br> Player 1 press A to confirm a match <br> Player 2 press L to confirm a match <br> Press N to go to the next card <br> The game ends when a player's deck is empty</inst>"
        }
		// Displays scores
        function displayScore() {
            idP1Count.innerHTML = `Cards: ${p1Deck.length}`
            idP2Count.innerHTML = `Cards: ${p2Deck.length}`
        }
		
		// write a function that deals new cards
        function dealCards() {
            //Make sure nobody has won and the state is play
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
                j = i % 4
                console.log(j)
                p1Deck[i] = formatCard(monsterArray, j)
                p2Deck[i] = formatCard(monsterArray, j)
            }
            dealCards()
            idGameMsgs.innerHTML = 'Match or Pass?'
        }
        
		// write a function that check for a winner
        function checkWin() {
            if(gameState == -1) return;
            if (p1Deck.length < 1){
                idGameMsgs.innerHTML = "Congratulations Player 2 Wins! <br> Press Start New Game to start a new game."
                return true
            }
            else if (p2Deck.length > 0) return false
            gameState = -1;
            idGameMsgs.innerHTML = "Congratulations Player 1 Win! <br> Press Start New Game to start a new game."
            return false
        }
        
		// write a checkMatch(event) function
        function checkMatch(e) {
            if(checkWin()) return
            else if(gameState == -1) return "sup"
            else if (e.code == "KeyN" && p1CurrCard != p2CurrCard){ 
                console.log("'")
                idGameMsgs.innerHTML = 'Match or Pass?'
                gameState = 0;
                return dealCards();
            }
            else if(e.code == "KeyN" && p1CurrCard == p2CurrCard) {
                if(gameState == .5){
                    gameState = 0;
                    dealCards();
                    idGameMsgs.innerHTML = 'Match or Pass?'

                }
                else idGameMsgs.innerHTML = "There is a match on the table, someone must claim it!";
                return
            }
            else if (gameState == .5) return
            if(e.code == "KeyA" && p1CurrCard == p2CurrCard) {
                score++
                idGameMsgs.innerHTML = "Nice Job Player 1! You Claim Player 2's Card!"
                p1Deck.push(p2CurrCard);
                p2Deck.splice(p2Index, 1)
                gameState = .5;
            }
            else if(e.code == "KeyA") {
                score--
                p2Deck.push(p1CurrCard);
                p1Deck.splice(p1Index, 1)
                idGameMsgs.innerHTML = "No Player 1! Player 2 Claims Your Card!"
                gameState = .5;
            }
            if(e.code == "KeyL" && p1CurrCard == p2CurrCard) {
                score++
                idGameMsgs.innerHTML = "Nice Job Player 2! You Claim Player 1's Card!"
                p2Deck.push(p1CurrCard);
                p1Deck.splice(p1Index, 1)
                gameState = .5;
            }
            else if(e.code == "KeyL") {
                score--
                p1Deck.push(p2CurrCard);
                p2Deck.splice(p2Index, 1)
                idGameMsgs.innerHTML = "No Player 2! Player 1 Claims Your Card!"
                gameState = .5;
            }
            // if(e.code != "KeyY" && e.code != "KeyN"){
            //     return idGameMsgs.innerHTML = "Looks like you pressed an invalid key! <br> Press ‘Y’ if matching or ‘N’ if not matching"
            // }
            displayScore();
        }