import { useEffect, useState, useRef } from "react"
import "./App.css"
import Card from "./components/Card";
import FlippedCard from "./components/FlippedCard";
import {getShuffledDeck} from "./utils.jsx";
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

  // console.log("Deck A:", deckA.queue)
  // console.log("Deck B:", deckB.queue)
  // console.log({mistakePile})
  // console.log({pile})
  // console.log({gameOver})
  // console.log({playerATurn})

  useEffect(() => {
    if (deckB.queue.length === 0 || deckA.queue.length === 0) setGameOver(true)
  }, [deckA, deckB])

  useEffect(() => {
    document.addEventListener("keyup", handleKeyDown)
    return () => document.removeEventListener("keyup", handleKeyDown);
  }, [playerATurn, canFlip])


  const handleKeyDown = e => {
    // canFlip is false when slap in progress
    if (!canFlip) return
    if ((e.key === "a" && playerATurn) || (e.key === "k" && !playerATurn)) {
      console.log("flipping")
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
    
    // unhighlight mistake maker's deck
    setTimeout(() => {
      setMistakeMaker("")
      setCanFlip(true)
    }, 1000)
  }

  const restart = () => {
    setGameOver(false)
    setShuffledDeck(getShuffledDeck())
    deckA.emptyQueue()
    deckB.emptyQueue()
    deckA.enqueueAll(shuffledDeck.slice(0, 26))
    deckB.enqueueAll(shuffledDeck.slice(26))
    pile.emptyQueue()
    mistakePile.emptyQueue()
  }

  return (
    <div className="App">
      {gameOver && <div className="results">
        <h1>Game over</h1>
        <p>Winner is {playerATurn ? "player A" : "player B"}</p>
        <button onClick={restart}>Restart</button>
      </div>}

      {!gameOver && <div className="board">
  
        <p>{playerATurn? "Player A's turn" : "Player B's turn"}</p>

        <div className="deck">
          <FlippedCard deckName="A" mistakeMaker={mistakeMaker} deckSize={deckA.queue.length}/>
        </div>

        <div className="deck">
          {pile.queue.length > 0 && !gameOver && 
            <Card key={pile.back.id} value={pile.back.value} pileWinner={pileWinner} deckSize={pile.queue.length} />}
        </div>
        
        <div className="deck">
          <FlippedCard deckName="B" mistakeMaker={mistakeMaker} deckSize={deckB.queue.length}/>
        </div>
        
        <div className="deck">
          {mistakePile.queue.length > 0 && <FlippedCard deckName="mistake" deckSize={mistakePile.queue.length}/>}
        </div>
      

      <button onClick={flipCard}>Flip card</button>
      <button onClick={() => slapPile(true)}>Player A slap</button>
      <button onClick={() => slapPile(false)}>Player B slap</button>
      
      </div>

          }
    </div>
  )
}


