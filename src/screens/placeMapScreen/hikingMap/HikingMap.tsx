import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import getPlaces from "../../../ajaxHandler/getPlace";
import { useState, useEffect } from "react";

interface Coordinates {
  lat: number;
  long: number;
}

interface PlaceMarker {
  placeId: string;
  coordinates: Coordinates;
}

export default function HikingMap() {
  const [placeMarkers, setPlaceMarkers] = useState<PlaceMarker[]>([]);

  useEffect(() => {
    const setPlaceMarkerInState = async () => {
      const getPlacesResult = await getPlaces();
      if (getPlacesResult.outcome === "FAILURE") {
        alert(getPlacesResult.errorCode);
        return;
      }

      const places = getPlacesResult.data;

      const filteredPlaces = places.filter((place) => place.location.type);

      const tempPlaceMarkers = filteredPlaces.map((place) => {
        return {
          placeId: place._id,
          coordinates: {
            lat: place.location.coordinates[0],
            long: place.location.coordinates[1],
          },
        };
      });

      setPlaceMarkers(tempPlaceMarkers);
    };

    setPlaceMarkerInState();
  }, []);

  console.log("MARKERS", placeMarkers);

  return (
    <MapContainer
      center={[46.132, 6.592]}
      zoom={8}
      scrollWheelZoom={true}
      style={{ height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={[46.132, 6.592]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      {placeMarkers.map((place) => (
        <Marker position={[place.coordinates.lat, place.coordinates.long]}>
          <Popup>ID {place.placeId}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
