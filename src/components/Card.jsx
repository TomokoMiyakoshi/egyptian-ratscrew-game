import React from "react"

export default function Card(props) {
    const {value, mistake} = props;
    return(
        <div className={`open-card ${mistake ? 'mistake': null}`}>
            <p>{value}</p>
        </div>
    )
}