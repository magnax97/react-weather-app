import React , { useState } from 'react'
import Search from './Search'
import Data from './Data'
import './homepage.css'


const HomePage = () =>{
    const [selectedCity , setSelectedCity] = useState(null)

    const handleSelectedChange = (selectedCity) =>{
        setSelectedCity(selectedCity)
    };

return (
    <div className="homepage">
        <Search onSelectChange={handleSelectedChange}/>
        <Data selectedValue={selectedCity}/>
    </div>
)


}

export default HomePage