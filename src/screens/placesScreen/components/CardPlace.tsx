import { Card } from "react-bootstrap";
import "./cardStyle.css";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useState } from "react";
import { Place } from "../../../interfaces/place";
import { Hike } from "../../../interfaces/hike";
import ListGroup from "react-bootstrap/ListGroup";
import { connect } from "react-redux";
import givePrettyDate from "../../../services/prettyDate";
import getHikesForAPlace from "../../../ajaxHandler/getHikeForAPlace";
import { Dispatch } from "redux";
import { ISelectHike } from "../../../reducers/interface";
import CreateNewHikeModal from "./CreateNewHikeModale";

interface CardPlaceProps {
  placeData: Place;
  onLoadHike: (hike: Hike) => void;
}

function CardPlace(props: CardPlaceProps) {
  const placeData: Place = props.placeData;
  const pictureUrl: string = placeData.picture || "/montain_default.jpg";

  const [hikesForThisPlace, setHikesForThisPlace] = useState<Hike[]>([]);
  const [createHike, setCreateHike] = useState<boolean>(false);
  const [showPopover, setShowPopover] = useState<boolean>(false);

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

  const handleClose = () => {
    setCreateHike(false);
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
        handleClose={handleClose}
        placeName={placeData.name}
        placeId={placeData._id}
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
        </Card.Body>
      </Card>
    </>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<ISelectHike>) => {
  return {
    onLoadHike: (hikeToLoad: Hike) => {
      dispatch({
        type: "SELECT_HIKE",
        hike: hikeToLoad,
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(CardPlace);
