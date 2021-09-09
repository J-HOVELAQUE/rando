import Modal from "react-bootstrap/Modal";
import "../../../globalStyle/modalStyle.css";

interface ConfirmationModalProps {
  handleClose: () => void;
  confiramtionIsAsked: boolean;
  deletionConfirmed: () => void;
  actionNameToValidate: string;
}

export default function DeleteConfirmationModal(props: ConfirmationModalProps) {
  return (
    <Modal
      show={props.confiramtionIsAsked}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">
          Etes-vous certain de vouloir {props.actionNameToValidate}
        </Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <button onClick={props.handleClose} className="abort-modal-button">
          Annuler
        </button>
        <button
          className="validate-modal-button"
          onClick={props.deletionConfirmed}
        >
          Valider
        </button>
      </Modal.Footer>
    </Modal>
  );
}
