import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchResult from '../SearchResult/SearchResult';
import cities from '../../cities';
import './Header.css'

function Header({ searchHandler, submit, show,search, appid }) {
  
  const [searchRes, setSearchRes] = useState([]);
  const [cityTempData, setCityTempData] = useState([]);
  const classesArray = ["search_result_container"];
    if(show){
        classesArray.push("show");
    }

  useEffect(() => {
   

   
    const fetchCityWeather = async (cityName) => {
      try {
        const response = await axios.get(
            "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + appid + "&units=metric"
        );
        console.log(response.data)
        const { main:{temp}, weather: [{ description: weatherType }] } = response.data;
        return { cityName,  temp, weatherType };
      } catch (error) {
        console.error(error.message);
        return null;
      }
    };
   
    const handleSearch = async () => {
        
      if (search.length > 0) {
        const filteredCities = cities.filter((city) =>
          city.name.toLowerCase().startsWith(search.toLowerCase())
        );
        const sliceResults = filteredCities.slice(0, 5);

        const cityWeatherPromises = sliceResults.map((result) =>
          fetchCityWeather(result.name)
        );

        const cityWeatherData = await Promise.all(cityWeatherPromises);
        setCityTempData(cityWeatherData.filter((data) => data !== null));
        setSearchRes(sliceResults);
        console.log(cityWeatherPromises)
      } else {
        setSearchRes([]);
        setCityTempData([]);
      }
    };

    // Initial search if props.search has a value
    if (searchHandler && searchHandler !== '') {
      handleSearch();
    }
  
  }, [search, searchHandler, appid, submit]);
 


  return (
    
    <div className="hear_wrapper">
        
        <div className="header__container">
                    <svg class="SearchBar_icons__37sj1 SearchBar_iconLocation__1Egat" viewBox="0 0 512 512"><path d="M256 0C153.755 0 70.573 83.182 70.573 185.426c0 126.888 165.939 313.167 173.004 321.035 6.636 7.391 18.222 7.378 24.846 0 7.065-7.868 173.004-194.147 173.004-321.035C441.425 83.182 358.244 0 256 0zm0 278.719c-51.442 0-93.292-41.851-93.292-93.293S204.559 92.134 256 92.134s93.291 41.851 93.291 93.293-41.85 93.292-93.291 93.292z"></path></svg>
                    <input type="text" name="search" id="search" onChange={(e) => searchHandler(e)} placeholder="Search" value={search} autoComplete="off" />
                    <button class="SearchBar_searchBtn__3qNgr"><svg class="SearchBar_icons__37sj1" viewBox="0 0 511.999 511.999"><path d="M508.874 478.708L360.142 329.976c28.21-34.827 45.191-79.103 45.191-127.309C405.333 90.917 314.416 0 202.666 0S0 90.917 0 202.667s90.917 202.667 202.667 202.667c48.206 0 92.482-16.982 127.309-45.191l148.732 148.732c4.167 4.165 10.919 4.165 15.086 0l15.081-15.082c4.165-4.166 4.165-10.92-.001-15.085zM202.667 362.667c-88.229 0-160-71.771-160-160s71.771-160 160-160 160 71.771 160 160-71.771 160-160 160z"></path></svg></button>
        </div>
                {/* <div classNamen={`search_result_container ${}`} > */}
        <div className= {classesArray.join(" ")} >
        {searchRes.map((result, index) => (
          <SearchResult
            key={index}
            submit={submit}
            cityName={result.name}
            stateName={result.state}
            temperature={cityTempData.find((data) => data.cityName === result.name)?.temp}
            weatherType={cityTempData.find((data) => data.cityName === result.name)?.weatherType}
          />
        ))}
        </div>
        {/* <div className= {classesArray.join(" ")} >
            {searchRes}
        </div> */}

      
    </div>
  );
}

export default Header;
