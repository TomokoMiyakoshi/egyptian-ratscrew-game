import React from "react"

export default function Card(props) {
    const {value, mistake, pileWinner} = props;

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
        <div style={styles} className={`open-card ${mistake ? 'mistake': null}`}>
            <p>{value}</p>
        </div>
    )
}