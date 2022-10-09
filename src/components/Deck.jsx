import react from "react"

export default (props) => {
    const {mistake, deckName, deckSize, topCardVal, pileWinner, playerName} = props

    let className = `deck ${deckName}`
    if (deckSize === 0) className += " empty"
    if (mistake) className += " wrong"
    if (pileWinner === "A") className += " winner-a"
    if (pileWinner === "B") className += " winner-b"
  
    const getFaceCardText = (value) => {
        if (value === 1) {
            text = "A"
        } else if (value === 11) {
            text = "J"
        } else if (value === 12) {
            text = "Q"
        } else {
            text = "K"
        }
        return text
    }
    let text = ""
    if (deckName === "pile") {
        if (topCardVal === 1 || topCardVal > 10) {
            text = getFaceCardText(topCardVal)
        } else {
            text = topCardVal
        }
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