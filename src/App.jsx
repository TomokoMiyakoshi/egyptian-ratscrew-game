import { useEffect, useState } from "react"
import "./App.css"
import Card from "./components/Card";
import {getShuffledDeck} from "./utils.jsx";
import useQueue from "./hooks/useQueue.js"

export default function App() {
  const [shuffledDeck] = useState(getShuffledDeck())
  const testDeckA = [{id:1, value:1},{id:2, value:1},{id:3, value:2},{id:4, value:3}]
  const testDeckB = [{id:5, value:2},{id:6, value:6},{id:7, value:6},{id:8, value:1}]
  const {queue: deckA, enqueue: enqueueA, dequeue: dequeueA} = useQueue(testDeckA)
  const {queue: deckB, enqueue: enqueueB, dequeue: dequeueB} = useQueue(testDeckB)

  // const {queue: deckA, enqueue: enqueueA, dequeue: dequeueA} = useQueue(shuffledDeck.slice(0, 26))
  // const {queue: deckB, enqueue: enqueueB, dequeue: dequeueB} = useQueue(shuffledDeck.slice(26))
  const {queue: mistakePile, enqueue: enqueueMistake, back: topMistakeCard} = useQueue([])
  const {queue: pile, enqueue: enqueuePile, back: topPileCard, front: bottomPileCard} = useQueue([])
  const [playerATurn, setPlayerATurn] = useState(true)
  const [canSlap, setCanSlap] = useState(true)

  // const topMistakeCardElem = <Card mistake={true} value={mistakePile[mistakePile.length - 1].value} />

  // console.log("rerender")
  // console.log(shuffledDeck)
  // console.log(deckA)
  // console.log(deckB)

  const rewardPlayer = (isSlapperA) => {
    // move all cards in pile to slapper's deck
  }

  const punishPlayer = (isSlapperA) => {
    // move slapper's top card to mistake pile
    if (isSlapperA) {
      enqueueMistake(dequeueA)
    } else {
      enqueueMistake(dequeueB)
    }
  }
  const slapPile = (isSlapperA) => {
    if (!canSlap) {
      console.log("cannot slap")
      return
    }

    console.log("Pile slapped by", isSlapperA ? "player A" : "player B")

    if (isValidSlap()) {
      console.log("reward player")

      // rewardPlayer(isSlapperA)
      // // set player turn to slapper's turn
      // setPlayerATurn(isSlapperA? true : false)
      // setPlayerATurn(playerATurn => !playerATurn)
      
    } else {
      console.log("punish player")

      // switch player turn
      // setPlayerATurn(playerATurn => !playerATurn)
    }

    setCanSlap(false)
  }


  const isValidSlap = () => {
    console.log("Pile", pile)

    if (pile.length <= 1) {
      return false
    }

    console.log("Top: ", topPileCard?.value)
    console.log("Under top: ", pile[pile.length - 2]?.value)
    console.log("Under under top: ", pile[pile.length - 3]?.value)
    console.log("Bottom:", bottomPileCard?.value)

    // check for double, top-bottom, and sandwich
    if (topPileCard.value === pile[pile.length - 2].value || 
        topPileCard.value === bottomPileCard.value || 
        pile.length >= 3 && topPileCard.value === pile[pile.length - 3].value) {
      return true
    }
    return false
  }
  
  const addToPile = (e) => {
    e.preventDefault()

    console.log(playerATurn ? "Player A" : "Player B", "flipping")
    
    // move top card from current turn's player's deck to pile
    if (playerATurn) {
      enqueuePile(dequeueA())
      // check if deck is empty
    } else {
      enqueuePile(dequeueB())
      // check if deck is empty
    }

    // console.log("Pile: ", pile)
    
    // change player turn
    setPlayerATurn(playerATurn => !playerATurn)

    setCanSlap(true)

  }

  // playerATurn ? console.log("player A") : console.log("player B")
  // console.log("deck A: ", deckA)
  // console.log("deck B: ", deckB)
  // console.log("pile: ", pile)


  return (
    <div className="App">
      <div className="board">
      <div className="deck-a">
        <p>A</p>
      </div>
      {topPileCard && <Card key={topPileCard.id} value={topPileCard.value}/>}
      <div className="deck-b">
        <p>B</p>
      </div>
      {mistakePile.length > 0 && topMistakeCard}
      </div>
      <button onClick={addToPile}>Flip card</button>
      <button onClick={() => slapPile(true)}>Player A slap</button>
      <button onClick={() => slapPile(false)}>Player B slap</button>
      
    </div>
  )
}


