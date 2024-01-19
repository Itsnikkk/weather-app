import React from 'react'
import './Graph2.css'

import Graph1 from '../Graph1/Graph1'

function Graph2(props) {

    var sunrise = props.sunrise
    var dateSunrise = new Date(sunrise * 1000);
    var hoursSunrise = dateSunrise.getHours();
    var minutesSunrise = "0" + dateSunrise.getMinutes();
    var sunriseTime = hoursSunrise + ':' + minutesSunrise.substr(-2);

    var sunset = props.sunset
    var dateSunset = new Date(sunset * 1000);
    var hoursSunset = dateSunset.getHours();
    var minutesSunset = "0" + dateSunset.getMinutes();
    var sunsetTime = hoursSunset + ':' + minutesSunset.substr(-2);

    return (
        <div className="graph2_container">
           
          <div className="suntime_container">
            <div className="sun_time_container">
                <span className="text1">Sunrise</span>
                <span className="sun_time"> {sunriseTime+"am"} </span>
            </div>
            <div className="sun_time_container">
                <span className="text1">Sunset</span>
                <span className="sun_time"> {sunsetTime+"pm"} </span>
            </div>
          </div>
          <div className="sunset_rise_container">
                <Graph1 />
          </div>
        </div>
    )
}

export default Graph2
