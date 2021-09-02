import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import SelectParticipants from "../../../components/SelectParticipants";
import createHike from "../../../ajaxHandler/createHike";

interface CreatePlaceModalProps {
  handleClose: () => void;
  createHike: boolean;
  placeName: string;
  placeId: string;
}

export default function CreateNewHikeModal(props: CreatePlaceModalProps) {
  const [date, setDate] = useState<string>("");
  const [durationInMinutes, setDurationInMinutes] = useState<string>("");
  const [elevationInMeters, setElevationInMeters] = useState<string>("");
  const [distanceInMeters, setDistanceInMeters] = useState<string>("");
  const [startingAltitude, setStartingAltitude] = useState<string>("");
  const [arrivalAltitude, setArrivalAltitude] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [placeId, setPlaceId] = useState<string>(props.placeId);
  const [participantsId, setParticipantsId] = useState<string[]>([]);

  const resetState = (): void => {
    setDate("");
    setDurationInMinutes("");
    setElevationInMeters("");
    setDistanceInMeters("");
    setStartingAltitude("");
    setArrivalAltitude("");
    setDescription("");
    setParticipantsId([]);
    props.handleClose();
  };

  const onSelectParticipants = (selectedParticipants: string[]) => {
    setParticipantsId(selectedParticipants);
  };

  const onSubmitNewHike = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const newHike = {
      date: date,
      durationInMinutes,
      elevationInMeters,
      distanceInMeters,
      startingAltitude,
      arrivalAltitude,
      description,
      place: placeId,
      participants: [...participantsId],
    };

    const recordStatus = await createHike(newHike);

    if (recordStatus.outcome === "FAILURE") {
      alert(recordStatus.errorCode + recordStatus.detail);
      return;
    }

    resetState();
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
            Ajouter une nouvelle sortie à {props.placeName}
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
              type="number"
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
          <label className="createPlaceLabel">
            Altitude de départ
            <input
              type="number"
              placeholder="Altitude de départ"
              onChange={(e) => setStartingAltitude(e.target.value)}
              className="createPlaceInput"
              value={startingAltitude}
            />
          </label>
          <label className="createPlaceLabel">
            Altitude de d'arrivée
            <input
              type="number"
              placeholder="Altitude de d'arrivée"
              onChange={(e) => setArrivalAltitude(e.target.value)}
              className="createPlaceInput"
              value={arrivalAltitude}
            />
          </label>
          <label className="createPlaceLabel">
            Description
            <input
              type="textArea"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              className="createPlaceInput"
              value={description}
            />
          </label>
          <SelectParticipants onSelectParticipants={onSelectParticipants} />
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            onClick={resetState}
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
