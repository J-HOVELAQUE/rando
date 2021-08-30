import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./createPlaceModalStyle.css";
import createPlace from "../../../ajaxHandler/createPlace";

interface CreatePlaceModalProps {
  handleClose: () => void;
  createHike: boolean;
}

export default function CreateNewHikeModal(props: CreatePlaceModalProps) {
  const [date, setDate] = useState<string>("");
  const [durationInMinutes, setDurationInMinutes] = useState<string>("");
  const [elevationInMeters, setElevationInMeters] = useState<string>("");
  const [distanceInMeters, setDistanceInMeters] = useState<string>("");
  const [startingAltitude, setStartingAltitude] = useState<string>("");
  const [arrivalAltitude, setArrivalAltitude] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [placeId, setPlaceId] = useState<string>("");
  const [participantsId, setParticipantsId] = useState<string[]>([]);

  // const resetState = (): void => {
  //   setPlaceName("");
  //   setPlaceAltitude(0);
  //   setPlaceMountainLocation("");
  //   setSelectedFile(null);
  //   props.handleClose();
  // };

  const onSubmitNewHike = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // const recordStatus = await createPlace({
    //   name: placeName,
    //   mountainLocation: placeMountainLocation,
    //   altitudeInMeters: placeAltitude,
    //   picture: selectedFile,
    // });

    // if (recordStatus.outcome === "FAILURE") {
    //   alert(recordStatus.errorCode + recordStatus.detail);
    //   return;
    // }

    // resetState();
    props.handleClose();
  };

  return (
    <Modal
      show={props.createHike}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <form onSubmit={(e) => onSubmitNewHike(e)}>
        <Modal.Header closeButton className="modalHeader">
          <Modal.Title className="modalTitle">
            Ajouter une nouvelle sortie
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <label className="create-hike-label">
            Date
            <input
              type="date"
              placeholder="Date de la sortie"
              onChange={(e) => setDate(e.target.value)}
              className="createPlaceInput"
              value={date}
            />
          </label>

          <label className="createPlaceLabel">
            Durée
            <input
              type="number"
              placeholder="Durée de la sortie"
              onChange={(e) => setDurationInMinutes(e.target.value)}
              className="createPlaceInput"
              value={durationInMinutes}
            />
            minutes
          </label>

          <label className="createPlaceLabel">
            Dénivelé
            <input
              type="text"
              placeholder="Dénivelé"
              onChange={(e) => setElevationInMeters(e.target.value)}
              className="createPlaceInput"
              value={elevationInMeters}
            />
          </label>

          <label className="createPlaceLabel">
            Distance
            <input
              type="number"
              placeholder="Distance"
              onChange={(e) => setDistanceInMeters(e.target.value)}
              className="createPlaceInput"
              value={distanceInMeters}
            />
          </label>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            // onClick={resetState}
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
