import React, {useEffect, useState} from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import { getCountryData } from '../API/GetAPI';


const WorldMap = ({ activeTab }) => {
  const [map, setMap] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCountryData();

        const processedData = data.map((country) => ({
          lat: country.countryInfo.lat,
          long: country.countryInfo.long,
          radius: activeTab === 'cases' ? country.cases 
                : activeTab === 'recovered' ? country.recovered
                : country.deaths,
        }));
        setMap(processedData);
      } catch (error) {
      }
    };

    fetchData();
  }, [activeTab]);

  return (
    <MapContainer center={[20, 0]} zoom={2.5} style={{ height: '100%', width: '100%', boxShadow: '0 0 10px rgba(200, 200, 200, 2' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {map.map((data, index) => (
        <Circle
        key={index}
        center={[data.lat, data.long]}
        pathOptions={{ fillColor: 'blue', color: 'blue'}}
        radius={Math.sqrt(data.radius) *100}
      />
      ))}
    </MapContainer>
  );
};

export default WorldMap;