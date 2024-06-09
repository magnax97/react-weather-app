import React, { useEffect, useState } from "react";
import axios from "axios";
//import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import './data.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { format } from 'date-fns';

const Data = ({selectedValue}) => {

    const [weather , setWeather] = useState(null)
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(null)

    useEffect(() => {
        if(selectedValue){
            const fetchWeather = async () =>{
                setLoading(true)
                setError(null)
                try{

                    const response_weather = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                        params: {
                        lat: selectedValue.value.latitude,
                        lon: selectedValue.value.longitude,
                        appid: '4774231220a4a61765fc6a3c1c4596ef',
                        units: 'metric', // or 'imperial' for Fahrenheit
                        }
                    });

                    const response_forecast = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
                        params: {
                        lat: selectedValue.value.latitude,
                        lon: selectedValue.value.longitude,
                        appid: '4774231220a4a61765fc6a3c1c4596ef',
                        units: 'metric', // or 'imperial' for Fahrenheit
                        cnt: 12
                        }
                    });

                    setWeather({
                        weather: response_weather.data , 
                        forecast: response_forecast.data
                    })

                }catch (err){
                    setError('Error fetching weather' + err)
                } finally{
                    setLoading(false)
                }

            }

            fetchWeather()
        }
    } , [selectedValue]);

    if (!selectedValue) {
        return '';
      }
    
      if (loading) {
        return <p>Loading weather data...</p>;
      }
    
      if (error) {
        return <p>{error}</p>;
      }

     
      const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

      const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const dayName = format(date, "EEEE");
        const dayOfMonth = format(date, "do 'of' MMMM");
        const time = format(date, "h:mm a");
        return { dayName, dayOfMonth, time };
      };

    return (    <div className="weather__container">
        <h1>{`${selectedValue.label}`}</h1>
        {weather && (
          <div>
            <img alt="icon" src={`http://openweathermap.org/img/w/${weather.weather.weather[0].icon}.png`} />
            <p>{`${weather.weather.weather[0].description}`}</p>
            <p>{`Temperature: ${weather.weather.main.temp}°C`}</p>
            <p>{`Min Temp: ${weather.weather.main.temp_min}°C`}</p>
            <p>{`Max Temp: ${weather.weather.main.temp_max}°C`}</p>
            <p>{`Humidity: ${weather.weather.main.humidity}%`}</p>
            <p>{`Wind Speed: ${weather.weather.wind.speed}Km/h`}</p>
            <h2>Forecast:</h2>
            <Carousel responsive={responsive}>
            {weather.forecast.list.map((forecastItem, index) => {
              const { dayName, dayOfMonth, time } = formatDate(forecastItem.dt);
              return (
                <div key={index} className="forecast-card">
                  <p>{dayName}</p><p> {dayOfMonth}</p><p> {time}</p>
                  <img alt="icon" src={`http://openweathermap.org/img/w/${forecastItem.weather[0].icon}.png`} />
                  <p>{`${forecastItem.weather[0].description}`}</p>
                  <p>{`Temp: ${forecastItem.main.temp}°C`}</p>
                  <p>{`Hum: ${forecastItem.main.humidity}%`}</p>
                  <p>{`Wind Speed: ${weather.weather.wind.speed}Km/h`}</p>
                </div>
              );
            })}
          </Carousel>
          </div>
        )}
      </div>
    );
}

export default Data