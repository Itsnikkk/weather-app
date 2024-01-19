import React from 'react'
import './Card.css'
import Temperature from '../Temperature/Temperature'
import Graph2 from '../sunriseset/Graph2'
import LineChart from '../LineChart/LineChart'
import PressureHumidity from '../PressureHumidity/PressureHumidity'

function Card(props) {

    const lessHours = props.dayInfo.filter(hourInfo => {
        const hourDate = new Date(hourInfo.dt_txt).getHours()
        const currDate = new Date().getHours();
        return hourDate <= currDate;
    });

    const currentTimeData = lessHours[lessHours.length - 1];
    const currTemp = currentTimeData.main.temp
    const weatherTypeDesc = currentTimeData.weather[0].description
    const pressure = currentTimeData.main.pressure
    const humidity = currentTimeData.main.humidity

    const graphData = props.dayInfo.map(hourInfo => {
        
        const date = new Date(hourInfo.dt_txt);
        const xData = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const yData = hourInfo.main.temp;
        
        return {
            "name": xData,
            "Temp": yData
        }
    });

    return (
        <div className="card_container">
            <Temperature currTemp={currTemp} weatherTypeDesc={weatherTypeDesc} />
            
            <div className="lineChartContainer">
                <LineChart data={graphData} />
            </div>
            
            <PressureHumidity pressure={pressure} humidity={humidity} />
            <Graph2 sunrise={props.sunrise} sunset={props.sunset} timezone={props.timezone} />
        </div>
    );
}

export default Card
