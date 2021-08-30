import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function HikingMap() {
  return (
    <MapContainer
      center={[46.132, 6.592]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "1000px" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[46.132, 6.592]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
