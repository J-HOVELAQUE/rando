import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "./placeMarkerStyle.css";

interface Coordinates {
  lat: number;
  long: number;
}

interface PlaceMarkerProps {
  placeId: string;
  coordinates: Coordinates;
}

export default function PlaceMarker(props: PlaceMarkerProps) {
  const getPlaceData = () => {
    console.log("GET DATA");
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
        <h6 className="marker-popup-title">ID {props.placeId}</h6>
        <ListGroup>
          <ListGroup.Item action>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
      </Popup>
    </Marker>
  );
}
