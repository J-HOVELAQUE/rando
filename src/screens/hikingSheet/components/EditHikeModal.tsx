import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import SelectParticipants from "../../../components/SelectParticipants";
import editHike from "../../../ajaxHandler/createHike";
import "../../../globalStyle/modalStyle.css";
import { Hike, PopulatedHike } from "../../../interfaces/hike";

interface EditPlaceModalProps {
  handleClose: () => void;
  editHike: boolean;
  hikeId: string;
  actualHikeData: PopulatedHike;
}

export default function EditHikeModal(props: EditPlaceModalProps) {
  const [date, setDate] = useState<string>(
    props.actualHikeData.date.toString()
  );
  const [durationInMinutes, setDurationInMinutes] = useState<string>(
    props.actualHikeData.durationInMinutes
  );
  const [elevationInMeters, setElevationInMeters] = useState<string>(
    props.actualHikeData.elevationInMeters
  );
  const [distanceInMeters, setDistanceInMeters] = useState<string>(
    props.actualHikeData.distanceInMeters
  );
  const [startingAltitude, setStartingAltitude] = useState<string>(
    props.actualHikeData.startingAltitude
  );
  const [arrivalAltitude, setArrivalAltitude] = useState<string>(
    props.actualHikeData.arrivalAltitude
  );
  const [description, setDescription] = useState<string>(
    props.actualHikeData.description
  );
  const [placeId, setPlaceId] = useState<string>(
    props.actualHikeData.place._id
  );
  const [participantsId, setParticipantsId] = useState<string[]>([]);

  const onSelectParticipants = (selectedParticipants: string[]) => {
    setParticipantsId(selectedParticipants);
  };

  const onEditHike = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
  };

  return (
    <Modal
      show={props.editHike}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <form onSubmit={(e) => onEditHike(e)}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Editer la sortie</Modal.Title>
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
            <label className="modal-label" htmlFor="hikeDuration">
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
            />
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
            onClick={props.handleClose}
            className="abort-modal-button"
          >
            Annuler
          </button>
          <button className="validate-modal-button">Editer</button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
