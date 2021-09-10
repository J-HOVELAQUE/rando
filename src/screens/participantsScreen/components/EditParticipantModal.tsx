import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../../../globalStyle/modalStyle.css";
import editParticipant from "../../../ajaxHandler/editParticipant";

interface ActualParticipantData {
  name: string;
  firstname: string;
  email: string;
  dateOfBirth?: string;
}

interface EditParticipantModalProps {
  handleClose: () => void;
  isEditingParticipant: boolean;
  actualParticipantData: ActualParticipantData;
}

export default function EditParticipantModal(props: EditParticipantModalProps) {
  const [participantName, setParticipantName] = useState<string>(
    props.actualParticipantData.name
  );
  const [participantFirstname, setParticipantFirstname] = useState<string>(
    props.actualParticipantData.firstname
  );
  const [participantEmail, setParticipantEmail] = useState<string>(
    props.actualParticipantData.email
  );
  const [participantDateOfBirth, setParticipantDateOfBirth] = useState<
    string | undefined
  >(props.actualParticipantData.dateOfBirth?.split("T")[0]);

  const onEditParticipant = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    console.log("EDIT>>>>>>>>>");
  };

  return (
    <Modal
      show={props.isEditingParticipant}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <form onSubmit={(e) => onEditParticipant(e)}>
        <Modal.Header closeButton className="modalHeader">
          <Modal.Title className="modal-title">
            Editer un participant
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
            className="abort-modal-button"
            onClick={() => {
              props.handleClose();
            }}
          >
            Annuler
          </button>
          <button className="validate-modal-button">Editer</button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
