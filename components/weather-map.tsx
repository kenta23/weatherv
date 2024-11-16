'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';


export default function WeatherMap({ lat, lon }: { lat: number; lon: number }) {
  const position: LatLngExpression | undefined = [lat, lon];

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer className='w-full h-f' center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          url="https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=b140c36cb091fcad750501aa73058188"
           attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a> contributors'
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
