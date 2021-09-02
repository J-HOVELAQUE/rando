import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import createParticipant from "../../../ajaxHandler/createParticipant";
import "../../../globalStyle/modalStyle.css";

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
  const [participantDateOfBirth, setParticipantDateOfBirth] =
    useState<string>("");
  const [paticipantPhoto, setParticipantPhoto] = useState<string | undefined>();

  const resetState = (): void => {
    setParticipantName("");
    setParticipantFirstname("");
    setParticipantEmail("");
    setParticipantDateOfBirth("");
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
          <Modal.Title className="modal-title">
            Créer un nouveau participant
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="modal-input-area">
            <label className="modal-label" htmlFor="participantName">
              Nom
            </label>
            <input
              type="text"
              placeholder="Nom du nouveau participant"
              onChange={(e) => setParticipantName(e.target.value)}
              className="modal-input"
              value={participantName}
              id="participantName"
              name="participantName"
            />
          </div>

          <div className="modal-input-area">
            <label className="modal-label" htmlFor="firstname">
              Prénom
            </label>
            <input
              type="text"
              placeholder="Prénom du nouveau participant"
              onChange={(e) => setParticipantFirstname(e.target.value)}
              className="modal-input"
              value={participantFirstname}
              id="firstname"
              name="firstname"
            />
          </div>

          <div className="modal-input-area">
            <label className="modal-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setParticipantEmail(e.target.value)}
              className="modal-input"
              value={participantEmail}
              id="email"
              name="email"
            />
          </div>

          <div className="modal-input-area">
            <label className="modal-label" htmlFor="birthDate">
              Date de naissance
            </label>
            <input
              type="date"
              placeholder="Date de naissance"
              onChange={(e) => setParticipantDateOfBirth(e.target.value)}
              className="modal-input"
              value={participantDateOfBirth || undefined}
              id="birthDate"
              name="birthDate"
            />
          </div>
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
