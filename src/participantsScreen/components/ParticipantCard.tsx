import { Card } from "react-bootstrap";
import "./ParticipantCardStyle.css";
import Participant from "../../interfaces/participant";

export default function ParticipantCard(props) {
  const participantData: Participant = props.participantData;

  return (
    <div className="participant-card">
      <img
        src="/icons8-anonymous-mask-200.png"
        className="participant-portrait"
      />
      <div className="participant-data">
        <h3>{participantData.firstname}</h3>
        <h3>{participantData.name}</h3>
        <h3>Né le {participantData.dateOfBirth}</h3>
      </div>
    </div>
  );
}
