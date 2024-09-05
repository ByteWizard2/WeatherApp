import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import { useEffect, useRef, useState } from 'react';

// Toastify for notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const inpuRef = useRef();

  const allIcons = {
    '01d': clear_icon,
    '01n': clear_icon,
    '02d': cloud_icon,
    '02n': cloud_icon,
    '03d': cloud_icon,
    '03n': cloud_icon,
    '04d': drizzle_icon,
    '04n': drizzle_icon,
    '09d': rain_icon,
    '09n': rain_icon,
    '010d': rain_icon,
    '010n': rain_icon,
    '013d': snow_icon,
    '013n': snow_icon,
  };

  const search = async (city) => {
    if (city === '') {
      toast.error('Please enter city name'); // Show toast notification
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message); // Show toast notification for errors
        return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      toast.error('Error in fetching weather data'); // Show toast notification for fetch errors
      console.error('Error in Fetching weather data');
    }
  };

  useEffect(() => {
    search('New York');
  }, []);

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inpuRef} type='text' placeholder='search' />
        <img
          src={search_icon}
          alt=''
          onClick={() => search(inpuRef.current.value)}
        />
      </div>

      {weatherData ? (
        <>
          <img src={weatherData.icon} alt='' className='weather-icon' />
          <p className='temperature'>{weatherData.temperature}°c</p>
          <p className='location'>{weatherData.location}</p>
          <div className='weather-data'>
            <div className='col'>
              <img src={humidity_icon} alt='' />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='col'>
              <img src={wind_icon} alt='' />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      <ToastContainer />
    </div>
  );
};

export default Weather;
