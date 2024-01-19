import React from 'react'
import './PressureHumidity.css'

function PressureHumidity(props) {
    return (
        <div className="pressure__humidity">
            <div className="pressure">
                <span className="pressure_text text1">Pressure</span>
                <span>{props.pressure} hpa</span>
            </div>
            <div className="humidity">
                <span className="humidity_text text1">Humidity</span>
                <span>{props.humidity}%</span>
            </div>
        </div>
    )
}

export default PressureHumidity
