import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import createParticipant from "../../../ajaxHandler/createParticipant";

interface CreateParticipantModalProps {
  handleClose: () => void;
  createParticipant: boolean;
}

export default function CreateParticipantModal(
  props: CreateParticipantModalProps
) {
  const [participantName, setParticipantName] = useState<string>("");
  const [participantFirstname, setParticipantFirstname] = useState<string>("");
  const [participantEmail, setParticipantEmail] = useState<string>("");
  const [participantDateOfBirth, setParticipantDateOfBirth] = useState<
    Date | undefined
  >();
  const [paticipantPhoto, setParticipantPhoto] = useState<string | undefined>();

  const resetState = (): void => {
    setParticipantName("");
    setParticipantFirstname("");
    setParticipantEmail("");
    setParticipantDateOfBirth(undefined);
    setParticipantPhoto(undefined);
    props.handleClose();
  };

  const onSubmitNewParticipant = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const recordStatus = await createParticipant({
      name: participantName,
      firstname: participantFirstname,
      email: participantEmail,
      dateOfBirth: participantDateOfBirth,
      photo: paticipantPhoto,
    });

    if (recordStatus.outcome === "FAILURE") {
      alert(recordStatus.errorCode + recordStatus.detail);
      return;
    }

    resetState();
    props.handleClose();
  };

  return (
    <Modal
      show={props.createParticipant}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <form onSubmit={(e) => onSubmitNewParticipant(e)}>
        <Modal.Header closeButton className="modalHeader">
          <Modal.Title className="modalTitle">
            Créer un nouveau participant
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <label className="createParticipantLabel">
            Nom
            <input
              type="text"
              placeholder="Nom du nouveau participant"
              onChange={(e) => setParticipantName(e.target.value)}
              className="createParticipantInput"
              value={participantName}
            />
          </label>

          <label className="createParticipantLabel">
            Prénom
            <input
              type="text"
              placeholder="Prénom du nouveau participant"
              onChange={(e) => setParticipantFirstname(e.target.value)}
              className="createParticipantInput"
              value={participantFirstname}
            />
          </label>

          <label className="createParticipantLabel">
            Email
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setParticipantEmail(e.target.value)}
              className="createParticipantInput"
              value={participantEmail}
            />
          </label>

          <label className="createParticipantLabel">
            Date de naissance
            <input
              type="date"
              placeholder="Date de naissance"
              onChange={(e) =>
                setParticipantDateOfBirth(new Date(e.target.value))
              }
              className="createParticipantInput"
              value={participantDateOfBirth?.toDateString() || undefined}
            />
          </label>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            onClick={resetState}
            className="abortCreateParticipantButton"
          >
            Annuler
          </button>
          <button className="validateCreateParticipantButton">Créer</button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
