import React, { useState } from 'react';
import Select from 'react-select';
import { InputAdornment, IconButton, TextField } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const SelectWithLocationButton = ({ onSelectChange, onUseCurrentLocation }) => {
  const [inputValue, setInputValue] = useState('');

  const customComponents = {
    Control: ({ children, ...props }) => (
      <TextField
        {...props.innerProps}
        variant="outlined"
        fullWidth
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {children}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onUseCurrentLocation}>
                <MyLocationIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    ),
  };

  return (
    <Select
      components={customComponents}
      onInputChange={setInputValue}
      onChange={onSelectChange}
      inputValue={inputValue}
      isClearable
    />
  );
};

export default SelectWithLocationButton;
