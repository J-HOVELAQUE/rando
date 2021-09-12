import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import "../../../globalStyle/modalStyle.css";

import updatePlacePicture from "../../../ajaxHandler/editPlacePicture";

type SelectedFile = File | null;

interface EditPlaceModalPictureProps {
  handleClose: () => void;
  isEditingPlacePicture: boolean;
  placeId: string;
}

export default function EditPlacePictureModal(
  props: EditPlaceModalPictureProps
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<SelectedFile>(null);

  const onChangePictureHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files === null) {
      return;
    }
    setSelectedFile(event.target.files[0]);
  };

  const resetState = (): void => {
    setSelectedFile(null);
    props.handleClose();
  };

  const onSubmitNewPlacePicture = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    setIsLoading(true);

    if (!selectedFile) {
      return;
    }

    const recordStatus = await updatePlacePicture(props.placeId, selectedFile);

    if (recordStatus.outcome === "FAILURE") {
      setIsLoading(false);
      alert(recordStatus.errorCode + recordStatus.detail);
      return;
    }

    resetState();
    setIsLoading(false);
    props.handleClose();
  };

  return (
    <Modal
      show={props.isEditingPlacePicture}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <form onSubmit={(e) => onSubmitNewPlacePicture(e)}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">
            Ajouter un nouveau lieu
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="modal-input-area">
            <label className="modal-label" htmlFor="picture">
              Image
            </label>
            <input
              type="file"
              name="file"
              onChange={(event) => {
                onChangePictureHandler(event);
              }}
              className="create-place-file-input"
              id="picture"
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

          {isLoading ? (
            <button className="validate-modal-button" disabled>
              Valider
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </button>
          ) : (
            <button className="validate-modal-button">Valider</button>
          )}
        </Modal.Footer>
      </form>
    </Modal>
  );
}
