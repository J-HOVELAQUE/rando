import "./ParticipantCardStyle.css";
import Participant from "../../interfaces/participant";
import givePrettyDate from "../../services/prettyDate";

interface ParticipantCardProps {
  participantData: Participant;
}

export default function ParticipantCard({
  participantData,
}: ParticipantCardProps) {
  return (
    <div className="participant-card">
      <img
        src="/icons8-anonymous-mask-200.png"
        className="participant-portrait"
      />
      <div className="participant-data">
        <h3>{participantData.firstname}</h3>
        <h3>{participantData.name}</h3>
        {participantData.dateOfBirth && (
          <h3>Né le {givePrettyDate(participantData.dateOfBirth)}</h3>
        )}
      </div>
    </div>
  );
}
