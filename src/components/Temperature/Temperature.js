import React from 'react'
import './Temperature.css'
import cloud from '../../images/cloud.svg'
import rain from '../../images/rain.svg'
import sun from '../../images/sun.svg'
import cloudy from '../../images/cloudy.svg'
import smoke from '../../images/smoke.svg'
import mist from '../../images/mist.svg'
import haze from '../../images/haze.svg'


function Temperature(props) {

     let weatherTypeDesc
    let imgUrl
    if(props.weatherTypeDesc === "clear sky"){
        weatherTypeDesc = "Clear"
        imgUrl = sun
    }else if(props.weatherTypeDesc === "scattered clouds"){
        weatherTypeDesc = "Cloud"
        imgUrl = cloud
    }else if(props.weatherTypeDesc === "light rain"){
        weatherTypeDesc = "Drizzle"
        imgUrl = rain
    }else if(props.weatherTypeDesc === "overcast clouds" || props.weatherTypeDesc === "few clouds" || props.weatherTypeDesc === "broken clouds"){
        weatherTypeDesc = "Cloudy"
        imgUrl = cloudy
    }else if(props.weatherTypeDesc === "smoke"){
        weatherTypeDesc = "Smoke"
        imgUrl = smoke 
    }else if(props.weatherTypeDesc === "mist"){
        weatherTypeDesc = "Mist"
        imgUrl = mist 
    }else if(props.weatherTypeDesc === "haze"){
        weatherTypeDesc = "Haze"
        imgUrl = haze 
    }

    return (
        <div className="temperature_container">
            <h1 className="temperature_temp">{ Math.ceil(props.currTemp)}&#176;C</h1>
            
            <img src={imgUrl} alt={weatherTypeDesc}/>

        </div>
    )
}

export default Temperature
