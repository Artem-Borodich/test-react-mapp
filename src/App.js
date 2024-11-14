// src/App.jsx
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MapComponent from './components/MapComponent';

const App = () => {
  const [searchLocation, setSearchLocation] = useState(null);

  const handleSearch = (location) => {
    setSearchLocation(location);
  };

  return (
    <div>
      <h1>City Guide</h1> {/* Проверьте, отображается ли заголовок */}
      <SearchBar onSearch={handleSearch} />
      <MapComponent searchLocation={searchLocation} />
    
    </div>
  );
};

export default App;
