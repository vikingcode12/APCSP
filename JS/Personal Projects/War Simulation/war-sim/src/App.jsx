import React, { useState, useEffect, useRef } from 'react'
import CardContainer from './CardContainer.jsx';
import masterCSS from './masterCSS.css'
// import fetch from 'node-fetch';


function App() {
  
  let card1 = "/Cards/def.png", 
  card2 = "/Cards/def.png",
  p1Score, p2Score, tScore, p1Deck, p2Deck;
  
  const [cards, setCards] = useState([card1, card2])
  const card1Ref = useRef()
  const card2Ref = useRef()
  const scoreRef = useRef()
  const deckRef = useRef()

  function fetchState() {
    fetch("http://localhost:3000/war")
    .then(response => {
      return response.json()
    }).then(res => {
      card1 =  res?.card1
      card2 = res?.card2
      p1Score = res?.player1
      p2Score = res?.player2
      tScore = res?.ties
      p1Deck = res?.p1Deck
      p2Deck = res?.p2Deck
    })
  }

  useEffect(() => {
    fetchState()
    const gameUpdate = setInterval(() => {

      fetchState()

      card1Ref.current.src = card1.dir
      card2Ref.current.src = card2.dir
      scoreRef.current.innerHTML = `Player 1 Score: ${p1Score}<br> Player 2 Score ${p2Score}<br> Ties: ${tScore}`
      deckRef.current.innerHTML = `Player Cards: ${p1Deck} Robo Cards: ${p2Deck}`


    }, 150);
    return () => clearInterval(gameUpdate)
  }, []);
  
  return (
    <>
      <h1>Welcome To <span>WAR</span> Sim</h1>
        <span>Epilepsy Warning!</span><br/>
        In this war the losers cards get added to the winner's deck<br/>and the game doesn't stop until one of the decks hit 0<br/>so beware this will take a while<br/>
        This is an attempt at learning how to make most of this server side<br/> to allow multiple people to see the same thing.
        <br/><br/><br/>
        <img ref={card1Ref} height="437.5" width="350" src="./Cards/def.png"/><span className="spacer">&nbsp&nbsp&nbsp</span>
        <img ref={card2Ref} height="437.5" width="350" src="./Cards/def.png"/><br/><br/><br/>
        <div ref={scoreRef}></div><br/>
        <div ref={deckRef}></div><br/>
    </>
  )
}

export default App
