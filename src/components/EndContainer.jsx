
export default (props) => {
    const {playerATurn, playerNames, exitGame, restart} = props
    return (
        <div className="end-container">
            <h1>Game over</h1>
            <p>Winner is <b>{playerATurn ? playerNames.player1 : 
                playerNames.player2}</b></p>
            <div>
                <button onClick={restart}>Restart</button>
                <button onClick={exitGame}>End game</button>
            </div>
        </div>
    )
}