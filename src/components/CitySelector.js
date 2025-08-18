import React from 'react';

const CitySelector = ({ cities, selectedCity, onSelect }) => {
  return (
    <div className="city-selector">
      <label htmlFor="city-select">Select a City:</label>
      <select 
        id="city-select"
        value={selectedCity || ''}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">-- Choose a city --</option>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
    </div>
  );
};

export default CitySelector;