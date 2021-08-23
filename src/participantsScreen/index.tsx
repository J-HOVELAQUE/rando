import ParticipantCard from "./components/ParticipantCard";
import Participant from "../interfaces/participant";
import { useEffect, useState } from "react";
import getParticipants from "./ajaxHandler/getParticipants";

export default function ParticipantsScreen(props) {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    getParticipantsInState();
  }, []);

  const getParticipantsInState = async () => {
    const participantResponse = await getParticipants();

    if (participantResponse.outcome === "SUCCESS") {
      setParticipants(participantResponse.data);
      return;
    }

    alert(participantResponse.errorCode);
  };

  return (
    <>
      <h1 className="hiking-title">Participants</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {participants.map((participant: Participant) => {
          return (
            <ParticipantCard
              key={participant._id}
              participantData={participant}
            />
          );
        })}
      </div>
    </>
  );
}
