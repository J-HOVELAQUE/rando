import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./createPlaceModalStyle.css";
import createPlace from "../../../ajaxHandler/createPlace";

type SelectedFile = File | null;

interface CreatePlaceModalProps {
  handleClose: () => void;
  createPlace: boolean;
}

export default function CreatePlaceModal(props: CreatePlaceModalProps) {
  const [placeName, setPlaceName] = useState<string>("");
  const [placeAltitude, setPlaceAltitude] = useState<string>("");
  const [placeMountainLocation, setPlaceMountainLocation] =
    useState<string>("");
  const [selectedFile, setSelectedFile] = useState<SelectedFile>(null);

  const onChangePictureHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files === null) {
      return;
    }
    setSelectedFile(event.target.files[0]);
  };

  const resetState = (): void => {
    setPlaceName("");
    setPlaceAltitude("");
    setPlaceMountainLocation("");
    setSelectedFile(null);
    props.handleClose();
  };

  const onSubmitNewPlace = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const recordStatus = await createPlace({
      name: placeName,
      mountainLocation: placeMountainLocation,
      altitudeInMeters: placeAltitude,
      picture: selectedFile,
    });

    if (recordStatus.outcome === "FAILURE") {
      alert(recordStatus.errorCode + recordStatus.detail);
      return;
    }

    resetState();
    props.handleClose();
  };

  return (
    <Modal
      show={props.createPlace}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <form onSubmit={(e) => onSubmitNewPlace(e)}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">
            Ajouter un nouveau lieu
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <label className="create-place-label">
            Nom
            <input
              type="text"
              placeholder="Nom du nouveau lieu"
              onChange={(e) => setPlaceName(e.target.value)}
              className="create-place-input"
              value={placeName}
            />
          </label>

          <label className="create-place-label">
            Altitude
            <input
              type="number"
              onChange={(e) => setPlaceAltitude(e.target.value)}
              className="create-place-input"
              value={placeAltitude}
            />
            mètres
          </label>

          <label className="create-place-label">
            Massif
            <input
              type="text"
              placeholder="Nom du nouveau lieu"
              onChange={(e) => setPlaceMountainLocation(e.target.value)}
              className="create-place-input"
              value={placeMountainLocation}
            />
          </label>

          <label className="create-place-label">
            Image
            <input
              type="file"
              name="file"
              onChange={(event) => {
                onChangePictureHandler(event);
              }}
              className="create-place-input"
            />
          </label>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            onClick={resetState}
            className="abort-create-place-button"
          >
            Annuler
          </button>
          <button className="validate-create-place-button">Créer</button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
