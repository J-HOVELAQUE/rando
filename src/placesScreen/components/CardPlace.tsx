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

const serverUrl = process.env.REACT_APP_SERVER_URL;

function popover(placeId: string) {
  const [hikesForThisPlace, setHikesForThisPlace] = useState<Hike[]>([]);

  console.log(">>>>>STATE", hikesForThisPlace);

  const getHikesForThisPlace = async (): Promise<
    OutcomeFailure | OutcomeSuccess<Hike[]>
  > => {
    if (serverUrl === undefined) {
      return {
        outcome: "FAILURE",
        errorCode: "UNKNOW_SERVER",
      };
    }

    const rawAnswer: Response = await fetch(serverUrl + "/hike/" + placeId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!rawAnswer.ok) {
      return {
        outcome: "FAILURE",
        errorCode: "NO_SERVER_RESPONSE",
      };
    }

    const answer = await rawAnswer.json();

    return {
      outcome: "SUCCESS",
      data: answer.hikes,
    };
  };

  const setHikesForThisPlaceInState = async () => {
    const hikesResponse = await getHikesForThisPlace();

    if (hikesResponse.outcome === "SUCCESS") {
      setHikesForThisPlace(hikesResponse.data);
      return;
    }

    alert(hikesResponse.errorCode);
  };

  useEffect(() => {
    setHikesForThisPlaceInState();
  }, []);

  return (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Randonnées effectuées ici</Popover.Header>
      <Popover.Body>
        {hikesForThisPlace.length > 0 ? (
          <ListGroup defaultActiveKey="#link1">
            {hikesForThisPlace.map((hike) => {
              return (
                <ListGroup.Item action href="#link1">
                  {hike.date}
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

export default function CardPlace(props) {
  const placeData: Place = props.placeData;
  const pictureUrl: string = placeData.picture || "/montain_default.jpg";

  return (
    <Card className="card-place">
      {placeData._id !== undefined ? (
        <OverlayTrigger
          trigger="click"
          placement="auto"
          overlay={popover(placeData._id)}
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
