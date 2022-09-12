import {useState, useRef} from "react"
import AlertDialog from "./AlertDialog"

export default (props) => {
  
  const [showRules, setShowRules] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const nameInput1 = useRef("")
  
  const rules = useRef("Players take turns flipping the top card from their deck and placing it facing up on the center pile. When one of the following situations arise,  the first player to slap the pile wins the round, and they begin the next round.\n\n1. the bottom and top card has the same value\n2. two cards of the same value are placed consecutively\n3. two cards of the same value are placed with a single card of different value between the two cards\n4. when two consecutive cards add up to 10 (A has a value of 1)\n5. when a King and Queen is placed consecutively, in either order\n\nIf a player slaps the pile and none of the above criteria are met, their top card is sent to the mistake pile in the center and the round continues. The cards in the mistake pile will be collected by the current round’s winner. The game is over when one of the players runs out of cards in their deck.")
  // const rulesElements = rules.split("\n").map(line => <p>{line}</p>)

  // stores player name inputs, is reset when game starts
  const [namesFormData, setNamesFormData] = useState({
    player1: "", 
    player2: ""
  })

  const handleFormChange = (e) => {
    setNamesFormData({
      ...namesFormData,
      [e.target.name]: e.target.value.trim()
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    // check that the two names are unique
    if (namesFormData.player1 && 
      namesFormData.player1.toLowerCase() === namesFormData.player2.toLowerCase()) {
        setShowError(true)
        setErrorMessage("Player 1 and player 2 cannot have the same name.")
        nameInput1.current.focus()
    } else {
      // store names in state, or default if form left unfilled
      props.setplayerNames({
        player1: namesFormData.player1 || "Player 1",
        player2: namesFormData.player2 || "Player 2",
      })

      // reset forms data state
      setNamesFormData({
        player1: "", 
        player2: ""
      })
      
      props.setPlaying(true)
    }

  }

  return (
      <div className="intro-container">
          <h1>Egyptian Ratscrew</h1>
          {!showRules && <button onClick={() => setShowRules(true)}>Show rules</button>}
          {showRules && <p className="rules">{rules.current}</p>}
          <p>Player 1:<br/>press <b>a</b> to flip card<br/>press <b>s</b> to slap pile</p>
          <p>Player 2:<br/>press <b>k</b> to flip card<br/>press <b>l</b> to slap pile</p>
          <form>
          <p>Enter your names:</p>
          <div>
            <input ref={nameInput1} autoFocus type="text" name="player1" placeholder="player 1" value={namesFormData.player1} onChange={handleFormChange} maxLength="8"/>
            <input type="text" name="player2" placeholder="player 2" value={namesFormData.player2} onChange={handleFormChange} maxLength="8"/>
          </div>
          
          <button onClick={handleFormSubmit}>Start</button>
          {showError &&  <AlertDialog setShowDialog={setShowError} message={errorMessage}/>}
          </form>
      </div>
    )
}