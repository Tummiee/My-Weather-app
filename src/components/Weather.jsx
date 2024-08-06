import './Weather.css'
import SearchIcon from '@mui/icons-material/Search';
import Humid from "../assets/humidity.png"
import Wind from "../assets/wind.png"
import { useEffect, useRef, useState } from 'react';

const Weather = () => {

  const inputRef = useRef()
  const [weatherData, setweatherData] = useState (false)



  const search = async (city) => {
    if(city === ""){
      alert("Enter City Name")
      return;
    }
    try{
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;

      const response = await fetch(url)
      const data = await response.json()

      if(!response.ok){
        alert(data.message);
        return;
      }
      console.log(data);
      const icon =  data.weather[0].icon || '01d';
      setweatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: `http://openweathermap.org/img/wn/${icon}.png`
      })
    } catch (error) {
      setweatherData(false)
      console.error("Error in fetching weather data")
    }
  }

  useEffect(() => {
    search("Lagos")
  },[]);

  return (
    <div className="weather">
        <div className="search">
          <input ref={inputRef} type="text" placeholder="City" className="search-bar" />
          <div><button type="button" className="btn" onClick={()=>search(inputRef.current.
            value)}>
            <SearchIcon style={{fontSize: 'clamp(1rem, 1.2vw, 2rem)',}}/>
          </button></div>
        </div>
        {weatherData?<>
          <img src={weatherData.icon}style={{width: '150px'}}/>
        <div className='city-temp'>
          <h1>{weatherData.temperature}°C</h1>
          <p>{weatherData.location}</p>
        </div>
        <div className='huwind'>
          <div className='huwind-sub'>
            <img src={Humid} alt='weather' style={{width: '50px'}}/>
            <div>
              <h3>{weatherData.humidity} %</h3>
              <p>Humidity</p>
            </div>
          </div>
          <div className='huwind-sub'>
            <img src={Wind} style={{width: '50px'}}/>
            <div>
              <h3>{weatherData.windSpeed} Km/h</h3>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
        </>: <></>}
    </div>
  )
}

export default Weather