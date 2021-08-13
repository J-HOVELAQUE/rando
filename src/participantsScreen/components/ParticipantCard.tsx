import { Card } from "react-bootstrap";
import "./ParticipantCardStyle.css";

export default function ParticipantCard(props) {
  return (
    <div className="participant-card">
      <img
        src="/icons8-anonymous-mask-200.png"
        className="participant-portrait"
      />
      <div className="participant-data">
        <h3>Julien</h3>
        <h3>Hovelaque</h3>
        <h3>Né le 19 mars 1978</h3>
      </div>
    </div>
  );
}
