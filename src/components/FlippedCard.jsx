import react from "react"

export default (props) => {
    const {mistakeMaker, deckSize, deckName} = props

    const styles={
        background: mistakeMaker === deckName ? "red" : ""
    }
    return (
        <div style={styles} className="card flipped-card">
            <p>{deckName === "mistake" ?  "": `${deckName}`}</p>
        </div>
    )
}