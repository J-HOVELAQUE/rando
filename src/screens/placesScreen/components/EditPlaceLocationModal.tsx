import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../../../globalStyle/modalStyle.css";
import { Place } from "../../../interfaces/place";

interface EditPlaceLocationModalProps {
  handleClose: () => void;
  isEditingPlaceLocation: boolean;
  placeData: Place;
}

export default function EditPlaceLocationModal(
  props: EditPlaceLocationModalProps
) {
  return (
    <Modal
      show={props.isEditingPlaceLocation}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">
          Editer {props.placeData.name}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body></Modal.Body>

      <Modal.Footer>
        <button
          type="button"
          onClick={props.handleClose}
          className="abort-modal-button"
        >
          Annuler
        </button>

        <button className="validate-modal-button">Update</button>
      </Modal.Footer>
    </Modal>
  );
}
