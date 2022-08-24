import { useState } from 'react'
import './App.css'
import Card from './components/Card';

export default function App() {

  // using fisher-yates to shuffle deck
  const shuffleArray = array => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array
  }

  const getShuffledDeck = () => {
    // shuffle deck of cards
    let cardVals = Array.from({length: 13}, (val, i) => i+ 1)
    let deck = [...cardVals, ...cardVals, ...cardVals, ...cardVals]
    let shuffledDeck = shuffleArray(deck)
    return shuffledDeck
  }

  const [shuffledDeck, setShuffledDeck] = useState(getShuffledDeck)
  const [deckA, setDeckA] = useState(shuffledDeck.slice(0, 26))
  const [deckB, setDeckB] = useState(shuffledDeck.slice(26))
  const [mistakePile, setMistakePile] = useState([3])
  const [belowTopCard, setBelowTopCard] = useState(null)
  const [bottomCard, setBottomCard] = useState(null)
  const [topCard, setTopCard] = useState(null)
  const [topIndexA, setTopIndexA] = useState(0)
  const [topIndexB, setTopIndexB] = useState(0)
  const [playerATurn, setPlayerATurn] = useState(true)

  // const topCardA = <Card key={topIndexA} value={deckA[topIndexA]}/>
  // const topCardB = <Card key={25 + topIndexB} value={deckB[topIndexB]}/>
  const topMistakeCard = <Card mistake={true} value={mistakePile[mistakePile.length - 1]} />
  // console.log("rerender")
  // console.log(shuffledDeck)
  console.log(deckA)
  console.log(deckB)

  return (
    <div className="App">
      <div className="board">
      {topCardA}
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
