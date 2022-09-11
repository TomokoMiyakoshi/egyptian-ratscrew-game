import {useState, useRef} from "react"

export default (props) => {
  
  const [showRules, setShowRules] = useState(false)

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
      [e.target.name]: e.target.value
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // store names in state
    props.setplayerNames({
      player1: namesFormData.player1 || "Player 1",
      player2: namesFormData.player1 || "Player 2",
    })

     // reset forms data state
    setNamesFormData({
      player1: "", 
      player2: ""
    })
    
    props.setPlaying(true)
  }


    return (
        <div className="intro-container">
            <h1>Egyptian Ratslap</h1>
            {!showRules && <button onClick={() => setShowRules(true)}>Show game rules</button>}
            {showRules && <p className="rules">{rules.current}</p>}
            <p>Player 1:<br/>press <b>a</b> to flip card<br/>press <b>s</b> to slap pile</p>
            <p>Player 2:<br/>press <b>k</b> to flip card<br/>press <b>l</b> to slap pile</p>
            <form>
            <p>Enter your names:</p>
            <div><input type="text" name="player1" placeholder="player 1" value={namesFormData.player1} onChange={handleFormChange}/>
            <input type="text" name="player2" placeholder="player 2" value={namesFormData.player2} onChange={handleFormChange}/></div>
            
            <button onClick={handleFormSubmit}>Start game</button>
            </form>
        </div>
    )
}