import react from "react"

export default (props) => {
    const {mistake, deckName, deckSize, topCardVal, pileWinner, playerName} = props

    let className = `deck ${deckName}`
    if (deckSize === 0) className += " empty"
    if (mistake) className += " wrong"
    if (pileWinner === "A") className += " winner-a"
    if (pileWinner === "B") className += " winner-b"
  
    let text = ""
    if (deckName === "pile") {
        text = topCardVal
    } else if (deckName === "mistake"){
        text = deckName.toUpperCase()
    } else {
        text = playerName
    }
    return (
        <div className={className}>
            <p>{text}</p>
        </div>
    )
}