import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    const apiKey = 'a278b858-a869-49d7-b1dd-365c6befa654';
    const url = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${apiKey}&geocode=${query}`;

    try {
      const response = await axios.get(url);
      const point = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
      const [longitude, latitude] = point.split(' ').map(Number);
      onSearch([latitude, longitude]); // Передаем координаты в MapComponent
    } catch (error) {
      console.error('Ошибка поиска:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введите адрес или место"
      />
      <button onClick={handleSearch}>Поиск</button>
    </div>
  );
};

export default SearchBar;
