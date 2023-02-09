import L from "leaflet";
import { useState } from "react";
import { TileLayer, Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet";
export function LeafletMap() {
  const [markers, setMarkers] = useState([
    {
      lat: 45.764043,
      lng: 4.835659,
      popup: "Example of Plant",
    },
    {
      lat: 48.8566,
      lng: 2.3522,
      popup: "Hello",
    }
  ]);
  const [center, setCenter] = useState([45.764043, 4.835659]);
  return (
    <MapContainer center={center as L.LatLngExpression} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={[marker.lat, marker.lng]}>
          <Popup>{marker.popup}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
