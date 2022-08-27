

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

export const getShuffledDeck = () => {
    let cardVals = Array.from({length: 13}, (value, i) => i + 1)
    let deck = [...cardVals, ...cardVals, ...cardVals, ...cardVals]
    // give each card a unique key
    deck = deck.map((value, index) => ({value, id: index}))
    let shuffledDeck = shuffleArray(deck)
    return shuffledDeck
  }
