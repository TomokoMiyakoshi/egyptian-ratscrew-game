
export default (props) => {
    return (
        <div className="results">
            <h1>Game over</h1>
            <p>Winner is {props.playerATurn ? "player A" : "player B"}</p>
            <button onClick={props.restart}>Restart</button>
            <button onClick={props.exitGame}>End game</button>
        </div>
    )
}