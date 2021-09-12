import "./ParticipantCardStyle.css";
import Participant, {
  RecordedParticipant,
} from "../../../interfaces/participant";
import givePrettyDate from "../../../services/prettyDate";
import EditParticipantModal from "./EditParticipantModal";
import { useState } from "react";

import { BsPencil, BsTrash } from "react-icons/bs";
import { AiOutlinePicture } from "react-icons/ai";

interface ParticipantCardProps {
  participantData: RecordedParticipant;
  refreshParticipantList: () => void;
}

export default function ParticipantCard({
  participantData,
  refreshParticipantList,
}: ParticipantCardProps) {
  const [isEditingParticipant, setIsEditingParticipant] =
    useState<boolean>(false);

  const handleClose = () => {
    refreshParticipantList();
    setIsEditingParticipant(false);
  };

  return (
    <>
      <EditParticipantModal
        isEditingParticipant={isEditingParticipant}
        handleClose={handleClose}
        actualParticipantData={participantData}
      />

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

        <div className="participant-button-zone">
          <button
            className="participant-button edit-button"
            title="Editer"
            onClick={() => {
              setIsEditingParticipant(true);
            }}
          >
            <BsPencil />
          </button>

          <button
            className="participant-button picture-button"
            title="Changer image"
          >
            <AiOutlinePicture />
          </button>
        </div>
      </div>
    </>
  );
}
