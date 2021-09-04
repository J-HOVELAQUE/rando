import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import "../../../globalStyle/modalStyle.css";
import editPlace from "../../../ajaxHandler/editPlace";

interface CreatePlaceModalProps {
  handleClose: () => void;
  editPlace: boolean;
  placeName: string;
  placeAltitude: string;
  placeMountainLocation: string;
  placeId: string;
}

export default function EditPlaceModal(props: CreatePlaceModalProps) {
  const [placeName, setPlaceName] = useState<string>(props.placeName);
  const [placeAltitude, setPlaceAltitude] = useState<string>(
    props.placeAltitude
  );
  const [placeMountainLocation, setPlaceMountainLocation] = useState<string>(
    props.placeMountainLocation
  );

  const onEditPlace = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const editStatus = await editPlace(props.placeId, {
      name: placeName,
      altitudeInMeters: placeAltitude,
      mountainLocation: placeMountainLocation,
    });

    if (editStatus.outcome === "FAILURE") {
      alert(editStatus.errorCode + editStatus.detail);
      return;
    }

    props.handleClose();
  };

  return (
    <Modal
      show={props.editPlace}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <form onSubmit={(e) => onEditPlace(e)}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">
            Editer {props.placeName}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="modal-input-area">
            <label className="modal-label" htmlFor="name">
              Nom
            </label>
            <input
              type="text"
              placeholder="Nom du nouveau lieu"
              onChange={(e) => setPlaceName(e.target.value)}
              className="modal-input"
              value={placeName}
              id="name"
              name="name"
            />
          </div>

          <div className="modal-input-area">
            <label className="modal-label" htmlFor="altitude">
              Altitude
            </label>
            <input
              type="number"
              onChange={(e) => setPlaceAltitude(e.target.value)}
              className="modal-input"
              value={placeAltitude}
              id="altitude"
              name="altitude"
            />
          </div>

          <div className="modal-input-area">
            <label className="modal-label" htmlFor="mountainLocation">
              Massif
            </label>
            <input
              type="text"
              placeholder="Nom du nouveau lieu"
              onChange={(e) => setPlaceMountainLocation(e.target.value)}
              className="modal-input"
              value={placeMountainLocation}
              id="mountainLocation"
              name="mountainLocation"
            />
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
