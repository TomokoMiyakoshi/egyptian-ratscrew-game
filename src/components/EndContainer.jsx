
export default (props) => {
    return (
        <div className="end-container">
            <h1>Game over</h1>
            <p>Winner is <b>{props.playerATurn ? props.playerNames.player1 : 
                props.playerNames.player2}</b></p>
            <div>
                <button onClick={props.restart}>Restart</button>
                <button onClick={props.exitGame}>End game</button>
            </div>
        </div>
    )
}