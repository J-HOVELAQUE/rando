import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./createPlaceModalStyle.css";
import { Place } from "./CardPlace";

const endPoint: string = "localhost:3000";

export default function CreatePlaceModal(props) {
  const [placeName, setPlaceName] = useState("");
  const [placeAltitude, setPlaceAltitude] = useState(0);
  const [placeMountainLocation, setPlaceMountainLocation] = useState("");

  const onSubmitNewPlace = async (e) => {
    e.preventDefault();

    const newPlace: Place = {
      name: placeName,
      altitudeInMeters: placeAltitude,
      mountainLocation: placeMountainLocation,
    };

    const rawAnswer = await fetch("http://localhost:3000/place", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlace),
    });

    if (rawAnswer.ok) {
      setPlaceName("");
      setPlaceAltitude(0);
      setPlaceMountainLocation("");
      props.handleClose();
    } else {
      const answer = await rawAnswer.json();
      alert(answer.error);
    }
  };

  return (
    <Modal
      show={props.createPlace}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <form onSubmit={(e) => onSubmitNewPlace(e)}>
        <Modal.Header closeButton className="modalHeader">
          <Modal.Title className="modalTitle">
            Ajouter un nouveau lieu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="createPlaceLabel">
            Nom
            <input
              type="text"
              placeholder="Nom du nouveau lieu"
              onChange={(e) => setPlaceName(e.target.value)}
              className="createPlaceInput"
              value={placeName}
            />
          </label>

          <label className="createPlaceLabel">
            Altitude
            <input
              type="number"
              onChange={(e) => setPlaceAltitude(Number(e.target.value))}
              className="createPlaceInput"
              value={placeAltitude}
            />
            mètres
          </label>

          <label className="createPlaceLabel">
            Massif
            <input
              type="text"
              placeholder="Nom du nouveau lieu"
              onChange={(e) => setPlaceMountainLocation(e.target.value)}
              className="createPlaceInput"
              value={placeMountainLocation}
            />
          </label>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            onClick={props.handleClose}
            className="abortCreatePlaceButton"
          >
            Annuler
          </button>
          <button className="validateCreatePlaceButton">Créer</button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
