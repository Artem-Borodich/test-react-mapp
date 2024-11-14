import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark, RoutePanel } from 'react-yandex-maps';

const MapComponent = ({ searchLocation }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [routeVisible, setRouteVisible] = useState(false); // Флаг для отображения маршрута

  // Массив достопримечательностей Витебска
  const attractions = [
 
    {
      name: 'Музей Марка Шагала',
      coordinates: [55.200531, 30.190551],
      description: 'Музей, посвящённый великому художнику, родившемуся в Витебске.',
    },
    {
      name: 'Центральный парк культуры и отдыха',
      coordinates: [55.186099, 30.200473],
      description: 'Популярное место отдыха горожан с озером и многочисленными аллеями.',
    },
    {
      name: 'Витебский театр имени Якуба Коласа',
      coordinates: [55.193327, 30.201742],
      description: 'Главный театр города, основанный в 1939 году.',
    },
    // Добавьте больше достопримечательностей, если нужно
  ];

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
  }, [userLocation, searchLocation]);

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

            {/* Маркеры для достопримечательностей Витебска */}
            {attractions.map((attraction, index) => (
             <Placemark
             
             key={index}
             geometry={attraction.coordinates}
             options={{
               iconColor: 'green', // Цвет маркера
               preset: 'islands#greenCircleIcon', // Стиль маркера с цветом
             }}
             properties={{
               // Текст будет отображаться рядом с маркером
               iconContent: attraction.name,  // Отображаем название достопримечательности
             }}
           />
           
            ))}

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
    </div>
  );
};

export default MapComponent;
