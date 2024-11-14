import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const TouristAttractionsMap = () => {
  // Массив с данными о достопримечательностях (название, координаты, описание)
  const attractions = [
    {
      name: 'Красная площадь',
      coordinates: [55.7558, 37.6173],
      description: 'Главная площадь Москвы, символ российской государственности.',
    },
    {
      name: 'Храм Василия Блаженного',
      coordinates: [55.7473, 37.6176],
      description: 'Известный православный храм с уникальной архитектурой.',
    },
    {
      name: 'Государственный Эрмитаж',
      coordinates: [59.9398, 30.3146],
      description: 'Один из крупнейших и старейших музеев в мире.',
    },
    // Можно добавить еще достопримечательности...
  ];

  return (
    <div style={{ height: '100vh' }}>
      <YMaps query={{ apikey: 'a278b858-a869-49d7-b1dd-365c6befa654' }}>
        <Map
          state={{
            center: [55.7558, 37.6173], // Центр карты (например, Москва)
            zoom: 10,
          }}
          width="100%"
          height="100%"
        >
          {/* Создаем маркеры для каждой достопримечательности */}
          {attractions.map((attraction, index) => (
            <Placemark
              key={index}
              geometry={attraction.coordinates}
              options={{
                iconColor: 'red',
              }}
              properties={{
                hintContent: attraction.name, // Появляется при наведении
                balloonContent: (
                  <div>
                    <h3>{attraction.name}</h3>
                    <p>{attraction.description}</p>
                  </div>
                ), // Содержимое балуна при клике
              }}
            />
          ))}
        </Map>
      </YMaps>
    </div>
  );
};

export default TouristAttractionsMap;
