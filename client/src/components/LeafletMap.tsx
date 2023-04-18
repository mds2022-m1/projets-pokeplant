import L from "leaflet";
import { useState } from "react";
import { TileLayer, Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet";
export function LeafletMap() {
  const [markers, setMarkers] = useState([
    {
      lat: 45.764043,
      lng: 4.835659,
      popup: (
        <>
          <h1>My Pokeplant</h1>
          <img src="https://www.sciencesetavenir.fr/assets/img/2017/03/31/cover-r4x3w1000-6214a248e6018-la-dionee-attrape-mouches-la-plus-spectaculaire-des-tueuses.jpg" alt="pokeplant-marker" width={"100%"}></img>
        </>
      ),
      iconUrl:
        "https://icon-library.com/images/marker-icon-png/marker-icon-png-12.jpg",
    },
    {
      lat: 48.8566,
      lng: 2.3522,
      popup: "Hello",
      iconUrl:
        "https://icon-library.com/images/marker-icon-png/marker-icon-png-12.jpg",
    },
  ]);
  const [center, setCenter] = useState([45.764043, 4.835659]);
  return (
    <MapContainer
      center={center as L.LatLngExpression}
      zoom={3}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.lat, marker.lng]}
          icon={L.icon({
            iconUrl: marker.iconUrl,
            iconSize: [35, 41],
          })}
        >
          <Popup>{marker.popup}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
