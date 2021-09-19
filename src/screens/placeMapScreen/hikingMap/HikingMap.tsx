import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import getPlaces from "../../../ajaxHandler/getPlace";
import { useState, useEffect } from "react";
import PlaceMarker from "./PlaceMarker";

interface Coordinates {
  lat: number;
  long: number;
}

interface PlaceMarkerData {
  placeId: string;
  placeName: string;
  coordinates: Coordinates;
}

export default function HikingMap() {
  const [placeMarkers, setPlaceMarkers] = useState<PlaceMarkerData[]>([]);

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
          placeName: place.name,
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
      {placeMarkers.map((place) => (
        <PlaceMarker
          placeId={place.placeId}
          coordinates={place.coordinates}
          placeName={place.placeName}
        />
      ))}
    </MapContainer>
  );
}
