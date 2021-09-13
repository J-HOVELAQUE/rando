import { Card } from "react-bootstrap";
import "./cardStyle.css";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useState } from "react";
import { Place } from "../../../interfaces/place";
import { PopulatedHike } from "../../../interfaces/hike";
import ListGroup from "react-bootstrap/ListGroup";
import { connect } from "react-redux";
import givePrettyDate from "../../../services/prettyDate";
import getHikesForAPlace from "../../../ajaxHandler/getHikeForAPlace";
import { Dispatch } from "redux";
import { IActions } from "../../../reducers/interface";
import CreateNewHikeModal from "./CreateNewHikeModale";
import EditPlaceModal from "./EditPlaceModal";
import deletePlace from "../../../ajaxHandler/deletePlace";
import EditPlacePictureModal from "./EditPlaceModalPicture";

import { BsPencil, BsTrash, BsEye } from "react-icons/bs";
import { AiOutlinePicture } from "react-icons/ai";

interface CardPlaceProps {
  placeData: Place;
  onLoadHike: (hike: PopulatedHike) => void;
  reloadPlaces: () => void;
}

function CardPlace(props: CardPlaceProps) {
  const placeData: Place = props.placeData;
  const pictureUrl: string = placeData.picture || "/montain_default.jpg";

  const [hikesForThisPlace, setHikesForThisPlace] = useState<PopulatedHike[]>(
    []
  );
  const [createHike, setCreateHike] = useState<boolean>(false);
  const [editPlace, setEditPlace] = useState<boolean>(false);
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const [isEditingPlacePicture, setIsEditingPlacePicture] =
    useState<boolean>(false);

  const setHikesForThisPlaceInState = async () => {
    if (placeData._id) {
      const hikesResponse = await getHikesForAPlace(placeData._id);

      if (hikesResponse.outcome === "SUCCESS") {
        setHikesForThisPlace(hikesResponse.data);
        return;
      }
      alert(hikesResponse.errorCode);
    }
  };

  const onDeletePlace = async () => {
    const deleteResult = await deletePlace(props.placeData._id);
    if (deleteResult.outcome === "FAILURE") {
      alert(deleteResult.detail);
    }

    props.reloadPlaces();
  };

  const handleCloseAllModals = () => {
    setCreateHike(false);
    setEditPlace(false);
    setIsEditingPlacePicture(false);
    props.reloadPlaces();
  };

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  const popover2 = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Randonnées effectuées ici</Popover.Header>
      <Popover.Body>
        {hikesForThisPlace.length > 0 ? (
          <ListGroup defaultActiveKey="#link1">
            {hikesForThisPlace.map((hike) => {
              return (
                <ListGroup.Item
                  key={hike._id}
                  action
                  href="#link1"
                  onClick={() => props.onLoadHike(hike)}
                >
                  {givePrettyDate(hike.date)}
                </ListGroup.Item>
              );
            })}
            <ListGroup.Item></ListGroup.Item>
          </ListGroup>
        ) : (
          <p>Aucune</p>
        )}
        <button
          onClick={() => {
            setCreateHike(true);
            togglePopover();
          }}
        >
          New
        </button>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <CreateNewHikeModal
        createHike={createHike}
        handleClose={handleCloseAllModals}
        placeName={placeData.name}
        placeId={placeData._id}
      />

      <EditPlaceModal
        editPlace={editPlace}
        handleClose={handleCloseAllModals}
        placeName={props.placeData.name}
        placeAltitude={props.placeData.altitudeInMeters.toString()}
        placeMountainLocation={props.placeData.mountainLocation}
        placeId={props.placeData._id}
      />

      <EditPlacePictureModal
        handleClose={handleCloseAllModals}
        isEditingPlacePicture={isEditingPlacePicture}
        placeId={props.placeData._id}
      />

      <Card className="card-place">
        {placeData._id !== undefined ? (
          <OverlayTrigger
            trigger="click"
            placement="auto"
            overlay={popover2}
            delay={1000}
            show={showPopover}
            onToggle={togglePopover}
          >
            <Card.Img
              variant="top"
              src={pictureUrl}
              className="card-place-picture"
              onClick={() => setHikesForThisPlaceInState()}
            />
          </OverlayTrigger>
        ) : null}

        <Card.Body>
          <Card.Title bsPrefix="card-place-title">{placeData.name}</Card.Title>
          <Card.Text>Massif: {placeData.mountainLocation}</Card.Text>
          <Card.Text>Altitude: {placeData.altitudeInMeters}m</Card.Text>

          <div className="card-button-zone">
            <button
              className="card-button edit-button"
              title="Editer"
              onClick={() => {
                setEditPlace(true);
              }}
            >
              <BsPencil />
            </button>
            <button
              className="card-button delete-button"
              title="Supprimer"
              onClick={() => {
                onDeletePlace();
              }}
            >
              <BsTrash />
            </button>
            <button
              className="card-button picture-button"
              title="Changer image"
              onClick={() => {
                setIsEditingPlacePicture(true);
              }}
            >
              <AiOutlinePicture />
            </button>
            <button
              className="card-button see-hike-button"
              title="Voir les sorties"
            >
              <BsEye />
            </button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<IActions>) => {
  return {
    onLoadHike: (hikeToLoad: PopulatedHike) => {
      dispatch({
        type: "SELECT_HIKE",
        hike: hikeToLoad,
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(CardPlace);
