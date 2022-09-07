import react from "react"

export default (props) => {
    const {deckName} = props

    return (
        <div className="card flipped-card">
            <p>{`${deckName}`}</p>
        </div>
    )
}