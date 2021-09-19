import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import { useState, useEffect } from "react";

interface ICoordinate {
  lat: number;
  long: number;
}

interface SetPlaceLocationMapProps {
  lat: number | undefined;
  long: number | undefined;
  changeCoordinates: (newCoordinates: ICoordinate) => void;
}

interface GetClickedCoordinatesProps {
  changeCoordinates: (newCoordinates: ICoordinate) => void;
}

function GetClickedCoordinates(props: GetClickedCoordinatesProps) {
  const map = useMapEvent("click", (event) => {
    props.changeCoordinates({ lat: event.latlng.lat, long: event.latlng.lng });
  });

  return null;
}

export default function SetPlaceLocationMap(props: SetPlaceLocationMapProps) {
  let centerLat: number = 46;
  let centerLong: number = 6;

  if (props.lat) {
    centerLat = props.lat;
  }

  if (props.long) {
    centerLong = props.long;
  }

  return (
    <MapContainer
      center={[centerLat, centerLong]}
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: "100%" }}
    >
      <GetClickedCoordinates changeCoordinates={props.changeCoordinates} />

      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.lat && props.long ? (
        <Marker position={[props.lat, props.long]}></Marker>
      ) : null}
    </MapContainer>
  );
}
