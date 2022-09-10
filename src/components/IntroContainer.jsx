import {useState, useRef} from "react"

export default (props) => {

  const gameRules = useRef("Players take turns flipping the top card from their deck and placing it facing up on the center pile. When one of the following situations arise,  the first player to slap the pile wins the round, and they begin the next round.<br/><br/>1. the bottom and top card has the same value<br/>2. two cards of the same value are placed consecutively<br/>3. two cards of the same value are placed with a single card of different value between the two cards<br/>4.when two consecutive cards add up to 10 (A has a value of 1)<br/>5. when a King and Queen is placed consecutively, in either order<br/><br/>If a player slaps the pile and none of the above criteria are met, their top card is sent to the mistake pile in the center and the round continues. The cards in the mistake pile will be collected by the current round’s winner. The game is over when one of the players runs out of cards in their deck.")


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
        <div className="intro-containe">
            <h1>Egyptian Ratslap</h1>
            <button>Show game rules</button>
            <p>{}</p>
            <p>Player 1:<br/>press a to flip card<br/>press s to slap pile</p>
            <p>Player 2:<br/>press k to flip card<br/>press l to slap pile</p>
            <form>
            <p>Enter your names:</p>
            <input type="text" name="player1" placeholder="player 1" value={namesFormData.player1} onChange={handleFormChange}/>
            <input type="text" name="player2" placeholder="player 2" value={namesFormData.player2} onChange={handleFormChange}/>
            <button onClick={handleFormSubmit}>Start game</button>
            </form>
        </div>
    )
}