import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const MapComponent = ({ searchLocation }) => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Получаем геопозицию пользователя
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      (error) => {
        console.error('Ошибка получения геолокации:', error);
      }
    );
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      {userLocation ? (
        <YMaps query={{ apikey: 'a278b858-a869-49d7-b1dd-365c6befa654' }}>
          <Map
            state={{
              center: searchLocation || userLocation, // Центрируем карту на результатах поиска или на геолокации пользователя
              zoom: 12,
            }}
            width="100%"
            height="100%"
          >
            {/* Добавляем метку для отображения геолокации пользователя */}
            <Placemark
              geometry={userLocation}
              options={{
                iconColor: 'blue', // Указываем цвет значка
              }}
              properties={{
                hintContent: 'Ваше местоположение',
                balloonContent: 'Это ваша текущая геопозиция',
              }}
            />
          </Map>
        </YMaps>
      ) : (
        <p>Загрузка карты...</p>
      )}
    </div>
  );
};

export default MapComponent;
