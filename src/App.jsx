import { useEffect, useState, useRef } from "react"
import "./App.css"
import Deck from "./components/Deck"
import IntroContainer from "./components/IntroContainer"
import EndContainer from "./components/EndContainer"
import {getShuffledDeck} from "./utils.jsx"
import useQueue from "./hooks/useQueue.js"

export default function App() {
  const [shuffledDeck, setShuffledDeck] = useState(getShuffledDeck())
  // const testDeckA = [{id:1, value:1},{id:2, value:1},{id:3, value:2},{id:4, value:3}]
  // const testDeckB = [{id:5, value:2},{id:6, value:6},{id:7, value:6},{id:8, value:1}]
  // const deckA = useQueue(testDeckA)
  // const deckB = useQueue(testDeckB)
  const testMistake = [{id:1, value:4},{id:2, value:3},{id:3, value:2},{id:4, value:1}]
  // const mistakePile = useQueue(testMistake)
  const deckA = useQueue(shuffledDeck.slice(0, 26))
  const deckB = useQueue(shuffledDeck.slice(26))
  const mistakePile = useQueue([])
  const pile = useQueue([])
  const [playerATurn, setPlayerATurn] = useState(true)
  const [canSlap, setCanSlap] = useState(true)
  const [canFlip, setCanFlip] = useState(true)
  const [pileWinner, setPileWinner] = useState("")
  const [mistakeMaker, setMistakeMaker] = useState("")
  const [gameOver, setGameOver] = useState(false)
  const [playing, setPlaying] = useState(false)

  // stores player names when form in intro component is submitted
  const [playerNames, setplayerNames] = useState({
    player1: "", 
    player2: ""
  })

  // console.log("Deck A:", deckA.queue)
  console.log("Deck B:", deckB.queue)
  // console.log({mistakePile})
  console.log({pile})
  // console.log({gameOver})
  // console.log({playerATurn})

  useEffect(() => {
    if (deckB.queue.length === 0 || deckA.queue.length === 0) {
      setGameOver(true)
      setPlaying(false)
    }
  }, [deckA, deckB])

  useEffect(() => {
    if (playing) {
      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [playing, playerATurn, canFlip])


  const handleKeyDown = e => {
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
    console.log(playerATurn ? "Player A" : "Player B", "flipping")
    
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

    // prevent players from flipping cards while displaying result of slap
    setCanFlip(false)

    console.log("Pile slapped by", isSlapperA ? "player A" : "player B")

    if (isValidSlap()) {
      console.log("reward player")

      rewardPlayer(isSlapperA)
      // set player turn to slapper's turn
      setPlayerATurn(isSlapperA? true : false)
      
    } else {
      console.log("punish player")

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
    if (topCard === secondCard || topCard == thirdCard || topCard == bottomCard) {
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

  const resetState = () => {
    setGameOver(false)
    setShuffledDeck(getShuffledDeck())
    deckA.emptyQueue()
    deckB.emptyQueue()
    deckA.enqueueAll(shuffledDeck.slice(0, 26))
    deckB.enqueueAll(shuffledDeck.slice(26))
    pile.emptyQueue()
    mistakePile.emptyQueue()
  }
  const restart = () => {
    resetState()
    setPlaying(true)
  }

  const cardsToBeWon = useRef(0)
  
  const exitGame = () => {
    // shown confirm dialog
    resetState()
    setPlaying(false)
  }

  return (
    <div className="App">

      {!playing && !gameOver && <IntroContainer setplayerNames={setplayerNames} setPlaying={setPlaying}/>}
        
      {gameOver && <EndContainer restart={restart} exitGame={exitGame}/>}

      {playing && <div className="board">
  
        <button className="exit" onClick={exitGame}>Exit</button>
        <div className="pile-text">
        <p>{playerATurn? `${playerNames.player1}'s turn` : `${playerNames.player2}'s turn`}</p>
        <p>{`${cardsToBeWon.current} ${cardsToBeWon.current === 1 ? "card" : "cards"} to be won`}</p>
        </div>

        <Deck playerName={playerNames.player1} deckName="a" deckSize={deckA.queue.length} mistake={"A" === mistakeMaker} pileWinner={"A" == pileWinner && pileWinner}></Deck>
        <Deck playerName={playerNames.player2} deckName="b" deckSize={deckB.queue.length} mistake={"B" === mistakeMaker} pileWinner={"B" == pileWinner && pileWinner}></Deck> 
        <Deck deckName="pile" topCardVal={pile.back && pile.back.value} pileWinner={pileWinner} deckSize={pile.queue.length}></Deck>
        <Deck deckName="mistake" deckSize={mistakePile.queue.length} mistake={mistakeMaker}></Deck>
        
        <p className="score-a">{`${deckA.queue.length} left`}</p>
        <p className="score-b">{`${deckB.queue.length} left`}</p>
        
    
      </div>

          }
    </div>
  )
}


