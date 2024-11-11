import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState(null); 
  const [isLocationLoaded, setIsLocationLoaded] = useState(false); 

  useEffect(() => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setIsLocationLoaded(true); 
        },
        (error) => {
          console.error('Ошибка получения геолокации:', error);
        }
      );
    }
  }, []); // ghbdtn vbh 

 
  if (!isLocationLoaded) {
    return <div>Загрузка карты...</div>;
  }

  return (
    <YMaps query={{ apikey: 'a278b858-a869-49d7-b1dd-365c6befa654' }}>
      <Map
        defaultState={{
          center: [userLocation.latitude, userLocation.longitude],
          zoom: 12,
        }}
        width="100%"
        height="400px"
      >
        {/* Мета отображается только если есть геопозиция */}
        {userLocation && (
          <Placemark
            geometry={[userLocation.latitude, userLocation.longitude]}
            properties={{
              balloonContent: "Ваше местоположение",
            }}
          />
        )}
      </Map>
    </YMaps>
  );
};

export default MapComponent;
