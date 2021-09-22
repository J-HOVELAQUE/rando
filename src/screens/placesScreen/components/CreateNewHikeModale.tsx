import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import SelectParticipants from "../../../components/SelectParticipants";
import createHike from "../../../ajaxHandler/createHike";
import "../../../globalStyle/modalStyle.css";

import MomentInput from "react-moment-input";
import moment from "moment";

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
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">
            Ajouter une nouvelle sortie à {props.placeName}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="modal-input-area">
            <label className="modal-label" htmlFor="hikeDate">
              Date
            </label>
            <input
              type="date"
              placeholder="Date de la sortie"
              onChange={(e) => setDate(e.target.value)}
              className="modal-input"
              value={date}
              id="hikeDate"
              name="hikeDate"
            />
          </div>

          <div className="modal-input-area">
            <MomentInput
              max={moment().add(5, "days")}
              min={moment()}
              format="YYYY-MM-DD HH:mm"
              options={true}
              readOnly={false}
              icon={false}
              onChange={(date: string) => {
                console.log(date);
              }}
            />

            {/* <label className="modal-label" htmlFor="hikeDuration">
              Durée
            </label>
            <input
              type="number"
              placeholder="Durée de la sortie"
              onChange={(e) => setDurationInMinutes(e.target.value)}
              className="modal-input"
              value={durationInMinutes}
              id="hikeDuration"
              name="hikeDuration"
            /> */}
          </div>

          <div className="modal-input-area">
            <label className="modal-label" htmlFor="hikeElevation">
              Dénivelé
            </label>
            <input
              type="number"
              placeholder="Dénivelé"
              onChange={(e) => setElevationInMeters(e.target.value)}
              className="modal-input"
              value={elevationInMeters}
              id="hikeElevation"
              name="hikeElevation"
            />
          </div>

          <div className="modal-input-area">
            <label className="modal-label" htmlFor="hikeDistance">
              Distance
            </label>
            <input
              type="number"
              placeholder="Distance"
              onChange={(e) => setDistanceInMeters(e.target.value)}
              className="modal-input"
              value={distanceInMeters}
              id="hikeDistance"
              name="hikeDistance"
            />
          </div>

          <div className="modal-input-area">
            <label className="modal-label" htmlFor="hikeElevationDeparture">
              Altitude de départ
            </label>
            <input
              type="number"
              placeholder="Altitude de départ"
              onChange={(e) => setStartingAltitude(e.target.value)}
              className="modal-input"
              value={startingAltitude}
              id="hikeElevationDeparture"
              name="hikeElevationDeparture"
            />
          </div>

          <div className="modal-input-area">
            <label className="modal-label" htmlFor="hikeElevationArrival">
              Altitude de d'arrivée
            </label>
            <input
              type="number"
              placeholder="Altitude de d'arrivée"
              onChange={(e) => setArrivalAltitude(e.target.value)}
              className="modal-input"
              value={arrivalAltitude}
              id="hikeElevationArrival"
              name="hikeElevationArrival"
            />
          </div>

          <div className="modal-input-area">
            <label className="modal-label" htmlFor="hikeDescription">
              Description
            </label>
            <textarea
              placeholder="Description"
              rows={5}
              cols={23}
              onChange={(e) => setDescription(e.target.value)}
              className="modal-input"
              value={description}
              id="hikeDescription"
              name="hikeDescription"
            />
          </div>

          <p>Participants :</p>
          <SelectParticipants onSelectParticipants={onSelectParticipants} />
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            onClick={resetState}
            className="abort-modal-button"
          >
            Annuler
          </button>
          <button className="validate-modal-button">Créer</button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
