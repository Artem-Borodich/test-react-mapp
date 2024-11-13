import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark, RoutePanel } from 'react-yandex-maps';

const MapComponent = ({ searchLocation }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [routeVisible, setRouteVisible] = useState(false); // Флаг для отображения маршрута

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

  useEffect(() => {
    // Когда и пользовательская геопозиция, и место поиска заданы, показываем маршрут
    if (userLocation && searchLocation) {
      setRouteVisible(true);
    }
  }, [userLocation, searchLocation]); // Запуск после получения обоих значений

  return (
    <div style={{ height: '100vh' }}>
      {userLocation ? (
        <YMaps query={{ apikey: 'a278b858-a869-49d7-b1dd-365c6befa654' }}>
          <Map
            state={{
              center: searchLocation || userLocation,
              zoom: 12,
            }}
            width="100%"
            height="100%"
          >
            {/* Метка для отображения геолокации пользователя */}
            <Placemark
              geometry={userLocation}
              options={{
                iconColor: 'blue',
              }}
              properties={{
                hintContent: 'Ваше местоположение',
                balloonContent: 'Это ваша текущая геопозиция',
              }}
            />

            {/* Метка для отображения результата поиска */}
            {searchLocation && (
              <Placemark
                geometry={searchLocation}
                options={{
                  iconColor: 'red',
                }}
                properties={{
                  hintContent: 'Результат поиска',
                  balloonContent: 'Это найденное место',
                }}
              />
            )}

            {/* Построение маршрута между двумя точками с использованием RoutePanel */}
            {routeVisible && userLocation && searchLocation && (
              <RoutePanel
                state={{
                  from: userLocation,
                  to: searchLocation,
                  type: 'auto', // Тип маршрута, например, 'auto' для автомобильного
                }}
                options={{
                  position: { top: 10, left: '50%' }, // Позиция панели маршрута на карте
                  offset: [-150, 0], // Сдвиг по оси X, чтобы центрировать панель
                  expanded: true, // Панель будет развернута по умолчанию
                }}
              />
            )}
          </Map>
        </YMaps>
      ) : (
        <p>Загрузка карты...</p>
      )}

      {/* Кнопка больше не требуется, маршрут строится автоматически */}
    </div>
  );
};

export default MapComponent;
