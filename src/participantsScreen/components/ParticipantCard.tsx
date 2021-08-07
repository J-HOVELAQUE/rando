import { Card } from "react-bootstrap";
import "./ParticipantCardStyle.css";

export default function ParticipantCard(props) {
  return (
    <div className="participantCard">
      <img
        src="https://res.cloudinary.com/dhov1sjr7/image/upload/v1628178101/chalune_za0zd4.jpg"
        className="participantPortrait"
      />
      <div className="participantData">
        <h3>Julien</h3>
        <h3>Hovelaque</h3>
        <h3>Né le 19 mars 1978</h3>
      </div>
    </div>
  );
}
