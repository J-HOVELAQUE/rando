import ListGroup from "react-bootstrap/ListGroup";
import { PopulatedHike } from "../../interfaces/hike";
import { RootState } from "../../reducers/interface";
import "./hikingSheetStyle.css";
import givePrettyDate from "../../services/prettyDate";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import EditHikeModal from "./components/EditHikeModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import deleteHike from "../../ajaxHandler/deleteHike";
import { IActions } from "../../reducers/interface";
import { Dispatch } from "redux";
import giveInHoursAndMinutes from "../../services/giveInHoursAndMinutes/index";

interface IDurationInHoursAndMinutes {
  mins: number;
  hours: number;
}

interface HikingSheetProps {
  activeHike: PopulatedHike | null;
  onUnselectHike: () => void;
}

function HikingSheet({ activeHike, onUnselectHike }: HikingSheetProps) {
  const [picture, setPicture] = useState<string>("/montain_default.jpg");
  const [editingHike, setEditingHike] = useState<boolean>(false);
  const [confiramtionIsAsked, setConfirmationIsAsked] =
    useState<boolean>(false);
  const [hikeDuration, setHikeDuration] = useState<
    IDurationInHoursAndMinutes | undefined
  >(undefined);

  useEffect(() => {
    if (activeHike) {
      if (activeHike.place.picture) {
        setPicture(activeHike.place.picture);
      }
      setHikeDuration(
        giveInHoursAndMinutes(Number(activeHike.durationInMinutes))
      );
    }
  }, []);

  const handleCloseAllModal = () => {
    setEditingHike(false);
    setConfirmationIsAsked(false);
  };

  const handleShowEditModal = () => {
    setEditingHike(true);
  };

  const onDeleteHike = async () => {
    if (!activeHike) {
      return;
    }

    const deleteResult = await deleteHike(activeHike._id);
    if (deleteResult.outcome === "FAILURE") {
      alert(deleteResult.detail);
      return;
    }

    onUnselectHike();
  };

  return (
    <>
      {activeHike !== null ? (
        <>
          <EditHikeModal
            handleClose={handleCloseAllModal}
            editHike={editingHike}
            hikeId={activeHike._id}
            actualHikeData={activeHike}
          />

          <DeleteConfirmationModal
            handleClose={handleCloseAllModal}
            confiramtionIsAsked={confiramtionIsAsked}
            deletionConfirmed={onDeleteHike}
            actionNameToValidate="effacer cette sortie"
          />

          <div className="display">
            <h1 className="hiking-title">{activeHike.place.name}</h1>
            <button
              className="hiking-button"
              onClick={() => handleShowEditModal()}
            >
              Editer cette sortie
            </button>
            <button
              className="hiking-button"
              onClick={() => setConfirmationIsAsked(true)}
            >
              Supprimer cette sortie
            </button>

            <div className="hiking-box">
              <img
                src={picture}
                alt="une photo du lieu de la randonée"
                className="hiking-sheet-image"
              ></img>
              <div className="hiking-data">
                <h3>Dénivelé cumulé: {activeHike.elevationInMeters} m</h3>
                <h3>Distance: {activeHike.distanceInMeters} m</h3>
                <h3>Altitude de départ: {activeHike.startingAltitude} m</h3>
                <h3>Altitude d'arrivé: {activeHike.arrivalAltitude} m</h3>
                <h3>
                  Durée de la sortie: {hikeDuration?.hours} heures{" "}
                  {hikeDuration?.mins}
                </h3>
                <h3>Date de la sortie: {givePrettyDate(activeHike.date)}</h3>
              </div>
            </div>
            <div className="hiking-box">
              <div className="participants-box">
                <h3 className="hiking-sheet-bottom-title">Participants: </h3>
                <ListGroup>
                  {activeHike.participants.map((part) => (
                    <ListGroup.Item
                      key={part.email}
                    >{`${part.firstname} ${part.name}`}</ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
              <div className="desc-box">
                <h3 className="hiking-sheet-bottom-title">Description: </h3>
                <p>{activeHike.description || null}</p>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

function mapStateToProps(state: RootState) {
  return {
    activeHike: state.activeHike,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IActions>) {
  return {
    onUnselectHike: () => {
      dispatch({
        type: "UNSELECT_HIKE",
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HikingSheet);
