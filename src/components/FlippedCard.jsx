import react from "react"

export default (props) => {
    const {mistakeMaker, deckName} = props

    console.log({mistakeMaker, deckName})

    const styles={
        background: mistakeMaker === deckName ? "red" : "",
        border: "1px solid black",
        height: "40px",
        width: "30px",
        marginBottom: "10px",
        textAlign: "center"
    }
    return (
        <div style={styles} className="card flipped-card">
            <p>{deckName === "mistake" ? "" : deckName}</p>
        </div>
    )
}