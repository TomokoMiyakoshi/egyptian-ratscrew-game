import { useEffect, useState } from "react"
import "./App.css"
import Card from "./components/Card";
import {getShuffledDeck} from "./utils.jsx";
import useQueue from "./hooks/useQueue.js"

export default function App() {
  const [shuffledDeck] = useState(getShuffledDeck())
  const testDeckA = [{id:1, value:1},{id:2, value:1},{id:3, value:2},{id:4, value:3}]
  const testDeckB = [{id:5, value:2},{id:6, value:6},{id:7, value:6},{id:8, value:1}]
  const deckA = useQueue(testDeckA)
  const deckB = useQueue(testDeckB)

  // const {queue: deckA, enqueue: enqueueA, dequeue: dequeueA} = useQueue(shuffledDeck.slice(0, 26))
  // const {queue: deckB, enqueue: enqueueB, dequeue: dequeueB} = useQueue(shuffledDeck.slice(26))
  const mistakePile = useQueue([])
  const pile = useQueue([])
  const [playerATurn, setPlayerATurn] = useState(true)
  const [canSlap, setCanSlap] = useState(true)
  const [pileWinner, setPileWinner] = useState("")
  const [gameOver, setGameOver] = useState(false)
  // const topMistakeCardElem = <Card mistake={true} value={mistakePile[mistakePile.length - 1].value} />

  console.log({pile})
  console.log("Deck A:", deckA.queue)
  console.log("Deck B:", deckB.queue)

  const flipCard = (e) => {
    e.preventDefault()

    console.log(playerATurn ? "Player A" : "Player B", "flipping")
    
    // move top card from current turn's player's deck to pile
    if (playerATurn) {
      pile.enqueue(deckA.dequeue())
      // check if deck is empty
    } else {
      pile.enqueue(deckB.dequeue())
      // check if deck is empty
    }
    
    // change player turn
    setPlayerATurn(playerATurn => !playerATurn)

    setCanSlap(true)
  }

  const slapPile = (isSlapperA) => {
    if (!canSlap) {
      console.log("cannot slap")
      return
    }

    console.log("Pile slapped by", isSlapperA ? "player A" : "player B")

    if (isValidSlap()) {
      console.log("reward player")

      rewardPlayer(isSlapperA)
      // set player turn to slapper's turn
      setPlayerATurn(isSlapperA? true : false)
      
    } else {
      console.log("punish player")
    }

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
      } else {
        deckB.enqueueAll(pile.queue)
      }
      
      pile.emptyQueue()
      setPileWinner("")
    }, 1000)  
  }

  const punishPlayer = (isSlapperA) => {
    // move slapper's top card to mistake pile
    if (isSlapperA) {
      // enqueueMistake(dequeueA)
    } else {
      // enqueueMistake(dequeueB)
    }
  }
  

  // playerATurn ? console.log("player A") : console.log("player B")

  return (
    <div className="App">
      <div className="board">
      <p>{playerATurn? "Player A's turn" : "Player B's turn"}</p>
      <div className="deck-a">
        <p>A</p>
      </div>
      {pile.queue.length > 0 && !gameOver && <Card key={pile.back.id} value={pile.back.value} pileWinner={pileWinner}/>}
      <div className="deck-b">
        <p>B</p>
      </div>
      {mistakePile.queue.length > 0 && mistakePile.front.value}
      </div>
      <button onClick={flipCard}>Flip card</button>
      <button onClick={() => slapPile(true)}>Player A slap</button>
      <button onClick={() => slapPile(false)}>Player B slap</button>
      
    </div>
  )
}


