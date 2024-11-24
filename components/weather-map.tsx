'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMap, useMapEvent, Rectangle,  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';


// const icon = L.icon({ iconUrl: "/images/marker-icon.png" });
// Custom marker icon
const customIcon = L.icon({
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


const POSITION_CLASSES: Record<string, string> = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}


const BOUNDS_STYLE = { weight: 1 }

function MinimapBounds({ parentMap, zoom }: { parentMap: L.Map; zoom: number }) {
  const minimap = useMap();

  // Clicking a point on the minimap sets the parent's map center
  const onClick = useCallback(
    (e: L.LeafletMouseEvent) => {
      parentMap.setView(e.latlng, parentMap.getZoom());
    },
    [parentMap]
  );
  useMapEvent("click", onClick);

  // Keep track of bounds in state to trigger renders
  const [bounds, setBounds] = useState(parentMap.getBounds());

  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds());
    // Update the minimap's view to match the parent map's center and zoom
    minimap.setView(parentMap.getCenter(), zoom);
  }, [minimap, parentMap, zoom]);

  useEffect(() => {
    // Attach event listeners to the parent map
    parentMap.on("move", onChange);
    parentMap.on("zoom", onChange);

    // Cleanup on unmount
    return () => {
      parentMap.off("move", onChange);
      parentMap.off("zoom", onChange);
    };
  }, [parentMap, onChange]);

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />;
}


function MinimapControl({ position, zoom } : { position?: string; zoom?: number }) {
  const parentMap = useMap()
  const mapZoom = zoom || 0

  // Memoize the minimap so it's not affected by position changes
  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: 80, width: 80 }}
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    ),
    [mapZoom, parentMap],
  )

  const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  )
}


const OWMAPIKEY = process.env.NEXT_PUBLIC_OWM_API_KEY as string;

export default function WeatherMap({ lat, lon }: { lat: number; lon: number }) {
  const position: LatLngExpression | undefined = [lat, lon];
 

  return (
    <div className="z-50 w-full bg-orange-300 p-2 rounded-xl h-[500px]">
      <MapContainer
        className="w-full h-full"
        center={position}
        zoom={10}
        scrollWheelZoom={false}
      >
        <TileLayer
          className="w-full"
          attribution='&copy; <a href="https://openweathermap.org/copyright">Openweather map</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LayersControl position="topright"> {/** add layer control */}
          {/* Temperature Layer */}
          <LayersControl.Overlay name="Temperature">
            <TileLayer
              attribution='&copy; <a href="https://openweathermap.org/copyright">OpenWeather</a>'
              url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${OWMAPIKEY}`}
            /> 
          </LayersControl.Overlay>

          {/* Precipitation Layer */}
          <LayersControl.Overlay name="Precipitation">
            <TileLayer
              attribution='&copy; <a href="https://openweathermap.org/copyright">OpenWeather</a>'
              url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${OWMAPIKEY}`}
            />
          </LayersControl.Overlay>

          {/* Wind Speed Layer */}
          <LayersControl.Overlay name="Wind Speed">
            <TileLayer
              attribution='&copy; <a href="https://openweathermap.org/copyright">OpenWeather</a>'
              url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${OWMAPIKEY}`}
            />
          </LayersControl.Overlay>


             {/* Sea Level Pressure */}
             <LayersControl.Overlay name="Sea level">
            <TileLayer
              attribution='&copy; <a href="https://openweathermap.org/copyright">OpenWeather</a>'
              url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${OWMAPIKEY}`}
            />
          </LayersControl.Overlay>


               {/* Clouds New */}
               <LayersControl.Overlay name="Clouds">
            <TileLayer
              attribution='&copy; <a href="https://openweathermap.org/copyright">OpenWeather</a>'
              url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${OWMAPIKEY}`}
            />
          </LayersControl.Overlay>

        </LayersControl>
        <Marker icon={customIcon} position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <MinimapControl position='bottomleft'/>
      </MapContainer>
    </div>
  );
}

