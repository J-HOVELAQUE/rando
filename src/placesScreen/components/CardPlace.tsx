import { Card, Button } from "react-bootstrap";
import "./cardStyle.css";

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

  return (
    <Card className="card-place">
      <Card.Img variant="top" src={pictureUrl} className="card-place-picture" />
      <Card.Body>
        <Card.Title bsPrefix="card-place-title">{placeData.name}</Card.Title>
        <Card.Text>Massif: {placeData.mountainLocation}</Card.Text>
        <Card.Text>Altitude: {placeData.altitudeInMeters}m</Card.Text>
      </Card.Body>
    </Card>
  );
}
