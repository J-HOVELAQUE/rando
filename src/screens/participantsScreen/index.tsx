import ParticipantCard from "./components/ParticipantCard";
import Participant from "../../interfaces/participant";
import { useEffect, useState } from "react";
import getParticipants from "../../ajaxHandler/getParticipants";
import CreateParticipantModal from "./components/CreateParticipantModal";

export default function ParticipantsScreen() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [createParticipant, setCreateParticipant] = useState<boolean>(false);

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

  const handleClose = () => {
    setCreateParticipant(false);
    getParticipantsInState();
  };

  const handleShow = () => setCreateParticipant(true);

  return (
    <>
      <CreateParticipantModal
        createParticipant={createParticipant}
        handleClose={handleClose}
      />

      <h1 className="hiking-title">Participants</h1>
      <button className="add-place-button" onClick={() => handleShow()}>
        Créer un nouveau participant
      </button>

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
