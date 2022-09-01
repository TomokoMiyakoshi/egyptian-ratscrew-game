import React from "react"

export default (props) => {
    const {value, pileWinner, deckSize} = props;

    let color;
    if (pileWinner == "A") {
        color = "green"
    } else if (pileWinner == "B") {
        color = "blue"
    }
    const styles = {
        backgroundColor: color
    }

    return(
        <div style={styles} className="card open-card">
            <p>{value}</p>
        </div>
    )
}