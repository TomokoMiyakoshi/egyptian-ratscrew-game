import { useEffect, useState } from "react"
import "./App.css"
import Card from "./components/Card";
import {getShuffledDeck} from "./utils.jsx";
import useQueue from "./hooks/useQueue.js"

export default function App() {
  const [shuffledDeck] = useState(getShuffledDeck())
  const {queue: deckA, enqueue: enqueueA, dequeue: dequeueA} = useQueue(shuffledDeck.slice(0, 26))
  const {queue: deckB, enqueue: enqueueB, dequeue: dequeueB} = useQueue(shuffledDeck.slice(26))
  const [mistakePile, setMistakePile] = useState([])
  const {queue: pile, enqueue: enqueuePile, back: topPileCard, front: bottomPileCard} = useQueue([])
  const [playerATurn, setPlayerATurn] = useState(true)

  const topMistakeCard = <Card mistake={true} value={mistakePile[mistakePile.length - 1]} />
  // console.log("rerender")
  // console.log(shuffledDeck)
  // console.log(deckA)
  // console.log(deckB)

  return (
    <div className="App">
      <div className="board">
      {/* {topCardA} */}
      <div className="deck-a">
        <p>A</p>
      </div>
      <div className="deck-b">
        <p>B</p>
      </div>
      {mistakePile.length > 0 && topMistakeCard}
      </div>
    </div>
  )
}


