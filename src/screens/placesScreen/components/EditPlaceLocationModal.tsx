import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../../../globalStyle/modalStyle.css";
import { Place } from "../../../interfaces/place";
import SetPlaceLocationMap from "./SetPlaceLocationMap";
import "./editPlaceLocationModalStyle.css";

interface EditPlaceLocationModalProps {
  handleClose: () => void;
  isEditingPlaceLocation: boolean;
  placeData: Place;
}

export default function EditPlaceLocationModal(
  props: EditPlaceLocationModalProps
) {
  const [lat, setLat] = useState<string>("0");
  const [long, setLong] = useState<string>("0");

  const onSetNewLocation = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    console.log("SET LOCATION");
  };

  return (
    <Modal
      show={props.isEditingPlaceLocation}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <form onSubmit={(e) => onSetNewLocation(e)}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">
            Editer {props.placeData.name}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="set-location-map-container">
            <SetPlaceLocationMap />
          </div>

          <div className="set-location-input-group">
            <div className="set-location-input-area">
              <label className="set-location-label" htmlFor="latitude">
                Latitude
              </label>
              <input
                type="number"
                onChange={(e) => setLat(e.target.value)}
                className="set-location-input"
                value={lat}
                id="latitude"
                name="latitude"
              />
            </div>

            <div className="set-location-input-area">
              <label className="set-location-label" htmlFor="longitude">
                Longitude
              </label>
              <input
                type="number"
                onChange={(e) => setLong(e.target.value)}
                className="set-location-input"
                value={long}
                id="longitude"
                name="longitude"
              />
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            onClick={props.handleClose}
            className="abort-modal-button"
          >
            Annuler
          </button>

          <button className="validate-modal-button">Update</button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
