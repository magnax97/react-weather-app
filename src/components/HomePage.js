import React , { useState } from 'react'
import Search from './Search'
import Data from './Data'
import './homepage.css'
import axios from 'axios'

const HomePage = () =>{
    const [selectedCity , setSelectedCity] = useState(null)

    const handleSelectedChange = (selectedCity) =>{
        setSelectedCity(selectedCity)
    };

    const handleUseCurrentLocation = async () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
    
            // Formattare le coordinate in ISO 6709
            const formattedLatitude = (latitude >= 0 ? '+' : '') + latitude.toFixed(6);
            const formattedLongitude = (longitude >= 0 ? '+' : '') + longitude.toFixed(6);
    
            try {
              const response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
                params: {
                  location: `${formattedLatitude}${formattedLongitude}`, // Corretto formato delle coordinate
                  limit: 1,
                },
                headers: {
                  'X-RapidAPI-Key': '0f646daa4emsh2d2fde2d67fce32p136c0cjsn19c76d30b3ec',
                  'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
                }
              });
    
              const city = response.data.data[0];
              const cityOption = {
                label: `${city.name}, ${city.countryCode}`,
                value: {
                    latitude: city.latitude,
                    longitude: city.longitude,
                }
              };
              setSelectedCity(cityOption);
            } catch (error) {
              console.error('Error fetching city data:', error);
            }
          }, (error) => {
            console.error('Error getting current location:', error);
          });
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      };

return (
    <div className="homepage">
        <Search 
            onSelectChange={handleSelectedChange}
            onUseCurrentLocation={handleUseCurrentLocation}
            />
        <Data selectedValue={selectedCity}/>
    </div>
)


}

export default HomePage