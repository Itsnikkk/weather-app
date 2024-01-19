import React from 'react'
import './SearchResult.css'
import cloud from '../../images/cloud.svg'
import rain from '../../images/rain.svg'
import sun from '../../images/sun.svg'
import cloudy from '../../images/cloudy.svg'
import smoke from '../../images/smoke.svg'
import mist from '../../images/mist.svg'
import haze from '../../images/haze.svg'

function SearchResult(props) {

    let weatherType
    let imgUrl
    if(props.weatherType === "clear sky"){
        weatherType = "Clear"
        imgUrl = sun
    }else if(props.weatherType === "scattered clouds"){
        weatherType = "Cloud"
        imgUrl = cloud
    }else if(props.weatherType === "light rain"){
        weatherType = "Drizzle"
        imgUrl = rain
    }else if(props.weatherType === "overcast clouds" || props.weatherType === "few clouds" || props.weatherType === "broken clouds"){
        weatherType = "Cloudy"
        imgUrl = cloudy
    }else if(props.weatherType === "smoke"){
        weatherType = "Smoke"
        imgUrl = smoke 
    }else if(props.weatherType === "mist"){
        weatherType = "Mist"
        imgUrl = mist 
    }else if(props.weatherType === "haze"){
        weatherType = "Haze"
        imgUrl = haze 
    }

    return (
        <div onClick={()=>props.submit(props.cityName, props.stateName)} className="searchlist_container">
            <p className="location_name">{props.cityName}, {props.stateName}</p>
            <div className="meta_data_container">
                <div className="temp_icon">
                    <span className="meta_temp_data">{Math.round(props.temperature)}&#176; C</span>
                    <span className="meta_temp_status">{weatherType}</span>
                </div>
                <img src={imgUrl} alt=""/>
            </div>
        </div>
    )
}

export default SearchResult
