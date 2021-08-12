import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./createPlaceModalStyle.css";
import { Place } from "./CardPlace";

const endPoint: string = "localhost:3000";

type SelectedFile = File | null;

export default function CreatePlaceModal(props) {
  const [placeName, setPlaceName] = useState("");
  const [placeAltitude, setPlaceAltitude] = useState(0);
  const [placeMountainLocation, setPlaceMountainLocation] = useState("");
  const [selectedFile, setSelectedFile] = useState<SelectedFile>(null);

  const onChangePictureHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const onAbortPlaceCreation = () => {
    setPlaceName("");
    setPlaceAltitude(0);
    setPlaceMountainLocation("");
    setSelectedFile(null);
    props.handleClose();
  };

  const onSubmitNewPlace = async (e) => {
    e.preventDefault();

    const newPlace: Place = {
      name: placeName,
      altitudeInMeters: placeAltitude,
      mountainLocation: placeMountainLocation,
    };

    const data = new FormData();
    data.append("name", placeName);
    data.append("altitudeInMeters", placeAltitude.toString());
    data.append("mountainLocation", placeMountainLocation);

    if (selectedFile !== null) {
      data.append("placePicture", selectedFile);
    }

    const rawAnswer = await fetch("http://localhost:3000/place", {
      method: "POST",
      body: data,
    });

    if (rawAnswer.ok) {
      setPlaceName("");
      setPlaceAltitude(0);
      setPlaceMountainLocation("");
      setSelectedFile(null);
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

          <label className="createPlaceLabel">
            Image
            <input
              type="file"
              name="file"
              onChange={(event) => {
                onChangePictureHandler(event);
              }}
              className="createPlaceInput"
            />
          </label>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            onClick={onAbortPlaceCreation}
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
