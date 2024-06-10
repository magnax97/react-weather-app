import { useState , useCallback } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { components } from 'react-select';
import { FaLocationArrow } from 'react-icons/fa';
import axios from 'axios'
import './search.css'


const Control = ({ children, ...props }) => (
  <components.Control {...props}>
    {children}
    <button
      type="button"
      className="location-button"
      onMouseDown={e => e.stopPropagation()} // Prevents the select from closing when clicking the button
      onClick={props.selectProps.onUseCurrentLocation}
    >
      <FaLocationArrow />
    </button>
  </components.Control>
);


const Search = ({onSelectChange , onUseCurrentLocation }) =>{
const [value , setValue] = useState(null)



const loadOptions = useCallback(async (searchQuery, loadedOptions, { page }) => {
  try {
    const response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
        params: {
          namePrefix: searchQuery,
          minPopulation: 1000,
          lang : 'it',
          offset: (page - 1) * 10, // offset for pagination
          limit: 10, // number of results per page
        },
        headers: {
          'X-RapidAPI-Key': '0f646daa4emsh2d2fde2d67fce32p136c0cjsn19c76d30b3ec',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      });

  
      const cities = response.data.data.map(city => ({
        label: `${city.name}, ${city.region} , ${city.country}`,
        value: {
          latitude: city.latitude,
          longitude: city.longitude,
        }
      }));
  
      return {
        options: cities,
        hasMore: response.data.metadata.totalCount > page * 10,
        additional: {
          page: page + 1,
        },
      };
    } catch (error) {
      console.error('Error loading options:', error);
      return {
        options: [],
        hasMore: false,
      };
    }
    
  }, []);


  const handleChange = selectedOption => {
    setValue(selectedOption);
    onSelectChange(selectedOption);
  };




return(
  <div className="container__search">
    <AsyncPaginate
        components={{Control}}
        placeholder="Search for a city"
        value={value}
        loadOptions={loadOptions}
        onChange={handleChange}
        additional={{
          page: 1,
        }}
        debounceTimeout={600}
        className="custom-select"
      classNamePrefix="custom-select"
      onUseCurrentLocation={onUseCurrentLocation}
    />
    </div>
)


}

export default Search