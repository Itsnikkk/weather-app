import React from 'react'
import './Hours.css'
import TempCard from '../TempCard/TempCard'

function Hours(props) {

    let hours = props.hoursArray.map((daySummary, index) => {
        return (
            <TempCard 
                key={index}
                date={daySummary.date}
                maxTemp={daySummary.maxTemp}
                minTemp={daySummary.minTemp}
                weatherTypeIcon={daySummary.weatherTypeIcon}
                weatherType={daySummary.weatherType}
                click={props.selectDay}
            />
        )
    })
    return (
        <div className="hours_container">
            {hours}
            {hours}
        </div>
    )
}

export default Hours
