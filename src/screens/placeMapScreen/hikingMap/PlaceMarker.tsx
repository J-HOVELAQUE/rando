import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "./placeMarkerStyle.css";
import getHikeForAPlace from "../../../ajaxHandler/getHikeForAPlace";
import prettyDate from "../../../services/prettyDate";

interface Coordinates {
  lat: number;
  long: number;
}

interface PlaceMarkerProps {
  placeId: string;
  placeName: string;
  coordinates: Coordinates;
}

interface HikeDataForPopup {
  hikeId: string;
  hikeDate: string;
}

export default function PlaceMarker(props: PlaceMarkerProps) {
  const [hikesForThisPlace, setHikesForThisPlace] = useState<
    HikeDataForPopup[]
  >([]);

  const getPlaceData = async () => {
    const getHikeResult = await getHikeForAPlace(props.placeId);
    if (getHikeResult.outcome === "FAILURE") {
      alert("Get hike for this place failed" + getHikeResult.errorCode);
      return;
    }

    const usefullHikesData = getHikeResult.data.map((hike) => {
      return { hikeId: hike._id, hikeDate: prettyDate(hike.date) };
    });
    setHikesForThisPlace(usefullHikesData);
  };

  return (
    <Marker
      position={[props.coordinates.lat, props.coordinates.long]}
      eventHandlers={{
        click: (e) => {
          getPlaceData();
        },
      }}
    >
      <Popup>
        <h6 className="marker-popup-title">{props.placeName}</h6>
        {hikesForThisPlace.length === 0 ? (
          <p>Aucune sortie</p>
        ) : (
          <ListGroup>
            {hikesForThisPlace.map((hike) => (
              <ListGroup.Item action>{hike.hikeDate}</ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Popup>
    </Marker>
  );
}
