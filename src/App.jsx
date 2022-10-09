import { useEffect, useState, useRef } from "react"
import "./App.css"
import IntroContainer from "./components/IntroContainer"
import EndContainer from "./components/EndContainer"
import Deck from "./components/Deck"
import {getShuffledDeck} from "./utils.jsx"
import useQueue from "./hooks/useQueue.js"
import useSound from "use-sound"
import cardFlip from "./assets/sounds/cardFlip.mp3"
import thud from "./assets/sounds/thud.mp3"

export default () => {
    const [gameOver, setGameOver] = useState(false)
    const [playing, setPlaying] = useState(false)

    // stores player names when form in intro component is submitted
    const [playerNames, setplayerNames] = useState({
      player1: "", 
      player2: ""
    })
 
    const [shuffledDeck, setShuffledDeck] = useState(getShuffledDeck())
    const deckA = useQueue(shuffledDeck.slice(0, 26))
    const deckB = useQueue(shuffledDeck.slice(26))
    const mistakePile = useQueue([])
    const pile = useQueue([])
    const [canSlap, setCanSlap] = useState(true)
    const [canFlip, setCanFlip] = useState(true)
    const [pileWinner, setPileWinner] = useState("")
    const [mistakeMaker, setMistakeMaker] = useState("")
    const [playerATurn, setPlayerATurn] = useState(true)
    const cardsToBeWon = useRef(0)
    const [playFlipSound] = useSound(cardFlip);
    const [playThudSound] = useSound(thud);
  
    useEffect(() => {
      if (deckB.queue.length === 0 || deckA.queue.length === 0) {
        setGameOver(true)
        setPlaying(false)
      }
    }, [deckA, deckB])
  
    useEffect(() => {
      if (playing && canFlip) {
        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown);
      }
    }, [playing, playerATurn, canFlip])
  
  
    const handleKeyDown = e => {
      console.log(canFlip)
      // canFlip is false when slap in progress
      if (!canFlip) return
      
      if ((e.key === "a" && playerATurn) || (e.key === "k" && !playerATurn)) {
        flipCard()
          // change player turn
          setPlayerATurn(playerATurn => !playerATurn)
      } else if (e.key === "s") {
        slapPile(true)
      } else if (e.key === "l") {
        slapPile(false)
      }
    }

  
    const flipCard = () => {
      // prevent other player from flipping immediately
      setCanFlip(false)
      setTimeout(() => {
        setCanFlip(true)
      }, 500)

      playFlipSound()
      
      // move top card from current turn's player's deck to pile
      if (playerATurn) {
        const deq = deckA.dequeue()
        console.log({deq})
        pile.enqueue(deq)
      } else {
        pile.enqueue(deckB.dequeue())
      }
      cardsToBeWon.current = cardsToBeWon.current + 1

      setCanSlap(true)
      
    }
  
    const slapPile = (isSlapperA) => {
      if (!canSlap)return

      playThudSound()
  
      // prevent players from flipping cards while displaying result of slap
      setCanFlip(false)
  
      if (isValidSlap()) {
        console.log("reward player")
  
        rewardPlayer(isSlapperA)
        // set player turn to slapper's turn
        setPlayerATurn(isSlapperA? true : false)
        
      } else {
        punishPlayer(isSlapperA)
      }
  
      // prevent same or other player from slapping pile again before new card is flipped to pile
      setCanSlap(false)
    
    }
  
  
    const isValidSlap = () => {
      if (pile.queue.length <= 1) {
        return false
      }
  
      const topCard = pile.back.value
      const secondCard = pile.queue[pile.queue.length - 2]?.value
      const thirdCard = pile.queue[pile.queue.length - 3]?.value
      const bottomCard = pile.front.value
  
      console.log({topCard})
      console.log({secondCard})
      console.log({thirdCard})
      console.log({bottomCard})
  
      // check for double, top-bottom, and sandwich
      if (topCard === secondCard || topCard == thirdCard || topCard == bottomCard || 
          Math.abs(topCard - secondCard) === 1 || topCard + bottomCard === 10 ) {
        return true
      }
      return false
    }
  
    const rewardPlayer = (isSlapperA) => {
      // show slapper has won the pile
      setPileWinner(isSlapperA ? "A" : "B")
  
      setTimeout(()=> {
        // move all cards in pile to slapper's deck
        if (isSlapperA) {
          deckA.enqueueAll(pile.queue)
          deckA.enqueueAll(mistakePile.queue)
        } else {
          deckB.enqueueAll(pile.queue)
          deckB.enqueueAll(mistakePile.queue)
        }
        
        pile.emptyQueue()
        mistakePile.emptyQueue()
        cardsToBeWon.current = 0
        setPileWinner("")
        setCanFlip(true)
      }, 1000)  
    }
  
    const punishPlayer = (isSlapperA) => {
      
      if (isSlapperA) {
        // highlight mistake maker's deck red
        setMistakeMaker("A")
        mistakePile.enqueue(deckA.dequeue())
        
      } else {
        setMistakeMaker("B")
        mistakePile.enqueue(deckB.dequeue())
      }
  
      cardsToBeWon.current = cardsToBeWon.current + 1
      
      // unhighlight mistake maker's deck
      setTimeout(() => {
        setMistakeMaker("")
        setCanFlip(true)
      }, 1000)
    }
  
    const resetStateAndRefs = () => {
      setGameOver(false)
      setPlaying(false)
      setShuffledDeck(getShuffledDeck())
      deckA.emptyQueue()
      deckB.emptyQueue()
      deckA.enqueueAll(shuffledDeck.slice(0, 26))
      deckB.enqueueAll(shuffledDeck.slice(26))
      pile.emptyQueue()
      mistakePile.emptyQueue()
      setCanSlap(true)
      setCanFlip(true)
      setPileWinner("")
      setMistakeMaker("")
      setPlayerATurn(true)
      cardsToBeWon.current = 0
    }

    const restart = () => {
      resetStateAndRefs()
      setPlaying(true)
    }
    
    const exitGame = () => {
      resetStateAndRefs()
    }

    return (
        <div className="App">
            {!playing && !gameOver && <IntroContainer setplayerNames={setplayerNames} setPlaying={setPlaying}/>}
            
            {gameOver && <EndContainer restart={restart} exitGame={exitGame} playerNames={playerNames} 
                playerATurn={playerATurn}/>}
        
            {playing && <div className="board">
                <button className="exit" onClick={exitGame}>Exit</button>
                <div className={`pile-text ${playerATurn ? "a" : "b"}`}>
                    <p>{playerATurn? `${playerNames.player1}'s turn` : `${playerNames.player2}'s turn`}</p>
                    <p>{`${cardsToBeWon.current} ${cardsToBeWon.current === 1 ? "card" : "cards"} to be won`}</p>
                </div>

                <Deck playerName={playerNames.player1} deckName="a" deckSize={deckA.queue.length} mistake={"A" === mistakeMaker} pileWinner={"A" == pileWinner && pileWinner}></Deck>
                <Deck playerName={playerNames.player2} deckName="b" deckSize={deckB.queue.length} mistake={"B" === mistakeMaker} pileWinner={"B" == pileWinner && pileWinner}></Deck> 
                <Deck deckName="pile" topCardVal={pile.back && pile.back.value} pileWinner={pileWinner} deckSize={pile.queue.length}></Deck>
                <Deck deckName="mistake" deckSize={mistakePile.queue.length} mistake={mistakeMaker}></Deck>
                
                <p className="score-a">{`${deckA.queue.length} left`}</p>
                <p className="score-b">{`${deckB.queue.length} left`}</p>
            </div>}
        </div>
      )
}