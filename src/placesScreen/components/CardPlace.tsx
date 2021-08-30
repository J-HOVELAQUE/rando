import { Card } from "react-bootstrap";
import "./cardStyle.css";
import Popover from "react-bootstrap/Popover";
import PopoverBody from "react-bootstrap/PopoverBody";
import PopoverHeader from "react-bootstrap/PopoverHeader";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useEffect, useState } from "react";
import { Place } from "../../interfaces/place";
import { Hike } from "../../interfaces/hike";
import { OutcomeSuccess, OutcomeFailure } from "../../interfaces/outcomes";
import ListGroup from "react-bootstrap/ListGroup";
import { connect, DispatchProp } from "react-redux";
import RootState from "../../reducers/interface";
import givePrettyDate from "../../services/prettyDate";
import getHikesForAPlace from "../ajaxHandler/getHikeForAPlace";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function popover(props) {
  const placeId = props.placeId;
  const [hikesForThisPlace, setHikesForThisPlace] = useState<Hike[]>([]);

  const setHikesForThisPlaceInState = async () => {
    const hikesResponse = await getHikesForAPlace(placeId);

    if (hikesResponse.outcome === "SUCCESS") {
      setHikesForThisPlace(hikesResponse.data);
      return;
    }

    alert(hikesResponse.errorCode);
  };

  useEffect(() => {
    setHikesForThisPlaceInState();
  }, []);

  const loadingHike = async (hikeId: string | undefined) => {
    if (hikeId === undefined) {
      return;
    }

    const rawAnswer: Response = await fetch(serverUrl + "/hike/" + hikeId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!rawAnswer.ok) {
      alert("loading failed");
    }

    const answer = await rawAnswer.json();
    props.loadHike(answer.hike);
  };

  return (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Randonnées effectuées ici</Popover.Header>
      <Popover.Body>
        {hikesForThisPlace.length > 0 ? (
          <ListGroup defaultActiveKey="#link1">
            {hikesForThisPlace.map((hike) => {
              return (
                <ListGroup.Item
                  action
                  href="#link1"
                  onClick={() => loadingHike(hike._id)}
                >
                  {givePrettyDate(hike.date)}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        ) : (
          <p>Aucune</p>
        )}
      </Popover.Body>
    </Popover>
  );
}

function CardPlace(props) {
  const placeData: Place = props.placeData;
  const pictureUrl: string = placeData.picture || "/montain_default.jpg";

  const loadHike = (hike: Hike) => {
    props.onLoadHike(hike);
  };

  return (
    <Card className="card-place">
      {placeData._id !== undefined ? (
        <OverlayTrigger
          trigger="click"
          placement="auto"
          overlay={popover({ placeId: placeData._id, loadHike: loadHike })}
          delay={1000}
        >
          <Card.Img
            variant="top"
            src={pictureUrl}
            className="card-place-picture"
          />
        </OverlayTrigger>
      ) : null}

      <Card.Body>
        <Card.Title bsPrefix="card-place-title">{placeData.name}</Card.Title>
        <Card.Text>Massif: {placeData.mountainLocation}</Card.Text>
        <Card.Text>Altitude: {placeData.altitudeInMeters}m</Card.Text>
      </Card.Body>
    </Card>
  );
}

function mapStateToProps(state: RootState) {
  return {
    activeHike: state.activeHike,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadHike: (hikeToLoad) => {
      dispatch({
        type: "SELECT_HIKE",
        hike: hikeToLoad,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardPlace);
