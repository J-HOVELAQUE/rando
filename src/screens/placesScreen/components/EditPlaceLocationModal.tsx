import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../../../globalStyle/modalStyle.css";
import { Place } from "../../../interfaces/place";
import SetPlaceLocationMap from "./SetPlaceLocationMap";
import "./editPlaceLocationModalStyle.css";
import SetPlaceLocation from "../../../ajaxHandler/setPlaceLocation";
import setPlaceLocation from "../../../ajaxHandler/setPlaceLocation";

interface EditPlaceLocationModalProps {
  handleClose: () => void;
  isEditingPlaceLocation: boolean;
  placeData: Place;
}

interface ICoordinate {
  lat: number;
  long: number;
}

export default function EditPlaceLocationModal(
  props: EditPlaceLocationModalProps
) {
  const [lat, setLat] = useState<number | undefined>(
    props.placeData.location.coordinates[0] || undefined
  );
  const [long, setLong] = useState<number | undefined>(
    props.placeData.location.coordinates[1] || undefined
  );

  const onSetNewLocation = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!lat || !long) {
      alert("Coordonnées invalides");
      return;
    }

    const setLocationResult = await setPlaceLocation(props.placeData._id, {
      lat: lat,
      long: long,
    });

    if (setLocationResult.outcome === "FAILURE") {
      alert("Enregistrement échoué");
      return;
    }

    props.handleClose();
  };

  const onChangeCoordinates = (newCoordinate: ICoordinate) => {
    setLat(newCoordinate.lat);
    setLong(newCoordinate.long);
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
            <SetPlaceLocationMap
              lat={lat}
              long={long}
              changeCoordinates={onChangeCoordinates}
            />
          </div>

          <div className="set-location-input-group">
            <div className="set-location-input-area">
              <label className="set-location-label" htmlFor="latitude">
                Latitude
              </label>
              <input
                type="number"
                onChange={(e) => setLat(Number(e.target.value))}
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
                onChange={(e) => setLong(Number(e.target.value))}
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
