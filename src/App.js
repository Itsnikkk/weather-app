import React, { useEffect, useState} from "react";
import './App.css';
import axios from "axios";
import Header from './components/Header/Header1'
import Hours from './components/Hours/Hours'
import Card from './components/Card/Card'

function App(){

     const [positionCoord,setpositionCoord]=useState(null);
     const [weatherData,setweatherData]=useState(null);
     const [selectedDay,setselectedDay]=useState(null);
     const [search,setsearch]=useState("");
     const [showSuggestion,setshowSuggestion]=useState(false);
     const appid="9b29d59cc0cc2c51b3253424e2119630";
     let latitude ;
    let longitude ;


  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position) => {
        
          setpositionCoord( {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          })
        });
      

    

    if(positionCoord){
      latitude = positionCoord.lat;
      longitude = positionCoord.lon;
      console.log(latitude,longitude)
    

    axios.get("https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + appid + "&units=metric")
    .then(res=> {
      const date = new Date().toLocaleDateString().split("/");
      let newDate
        if(date[0]>=1 &&date[0]<=9){
           newDate= [date[2], `0${date[0]}`, date[1]].join("-");
        }else{
           newDate = [date[2], date[0], date[1]].join("-");
        }
      
        setweatherData(res.data)
        setselectedDay(newDate)
      
    })
    .catch(error => console.log(error));
       
  }},[])
  
  useEffect(()=>{
    if(positionCoord !==null){
        axios.get("https://api.openweathermap.org/data/2.5/forecast?lat=" + positionCoord.lat + "&lon=" + positionCoord.lon + "&appid=" + appid + "&units=metric")
        .then(res=> {
          const date = new Date().toLocaleDateString().split("/");
          let newDate
          if(date[0]>=1 &&date[0]<=9){
             newDate= [date[2], `0${date[0]}`, date[1]].join("-");
          }else{
             newDate = [date[2], date[0], date[1]].join("-");
          }
          setweatherData(res.data)
          setselectedDay(newDate)
        })
        .catch(error => console.log(error));
      }

  },[positionCoord])
  

  let dateSelectHandler = (selectedDate) => {
    setselectedDay(selectedDate);
  }

  let searchHandler = (event) => {
    const value = event.target.value;
    
   
    setsearch(value)
    setshowSuggestion(value.length>0);
  }


  let submitSearchHanlder = (cityName, stateName) => {

    setsearch(cityName + ", " + stateName);

    axios.get("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + appid + "&units=metric")
      .then(res=> {
        const date = new Date().toLocaleDateString().split("/");
        let newDate
        if(date[0]>=1&&date[0]<=9){
           newDate= [date[2], "0"+date[0], date[1]].join("-");
        }else{
           newDate = [date[2], date[0], date[1]].join("-");
        }
       
        
          setweatherData(res.data)
          setselectedDay(newDate)
          setshowSuggestion(false)
        
      })
      .catch(error => console.log(error));
  }


    let hours = null;
    let card = null;
    let hoursArray = [];
    if(weatherData && selectedDay){
      const list = weatherData["list"];
     
      const days = [3, 11, 19, 27, 35];
      for(let day of days){
        hoursArray.push({
          date: list[day].dt_txt,
          maxTemp : list[day].main.temp_max,
          currTemp : list[day].main.temp,
          minTemp : list[day].main.temp_min,
          weatherTypeIcon : list[day].weather[0].icon,
          weatherType : list[day].weather[0].description
        });
      }
      hours = <Hours hoursArray={hoursArray} selectDay={dateSelectHandler} />

      

      const dayInfo = list.filter((hourInfo )=>{
        return hourInfo.dt_txt.substring(0, 10) === selectedDay
    });
     
      card = <Card dayInfo={dayInfo} sunrise={weatherData.city.sunrise} sunset={weatherData.city.sunset} />
    }

    return (    
      <div className="container">
        <Header appid={appid} show={showSuggestion} submit={submitSearchHanlder} search={search} searchHandler={searchHandler}  />
        {showSuggestion && <div className='overlay' onClick={()=> {setshowSuggestion(false)}} ></div>}
        {hours}
        {card}
      </div>
    );
  }


export default App;
