import { Card } from "react-bootstrap";
import "./cardStyle.css";
import Popover from "react-bootstrap/Popover";
import PopoverBody from "react-bootstrap/PopoverBody";
import PopoverHeader from "react-bootstrap/PopoverHeader";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

export interface Place {
  _id?: string;
  name: string;
  altitudeInMeters: number;
  mountainLocation: string;
  city?: string;
  picture?: string;
}

export default function CardPlace(props) {
  const placeData: Place = props.placeData;
  const pictureUrl: string = placeData.picture || "/montain_default.jpg";

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Body>
    </Popover>
  );

  return (
    <Card className="card-place">
      <OverlayTrigger
        trigger="click"
        placement="auto"
        overlay={popover}
        delay={1000}
      >
        <Card.Img
          variant="top"
          src={pictureUrl}
          className="card-place-picture"
        />
      </OverlayTrigger>
      <Card.Body>
        <Card.Title bsPrefix="card-place-title">{placeData.name}</Card.Title>
        <Card.Text>Massif: {placeData.mountainLocation}</Card.Text>
        <Card.Text>Altitude: {placeData.altitudeInMeters}m</Card.Text>
      </Card.Body>
    </Card>
  );
}
