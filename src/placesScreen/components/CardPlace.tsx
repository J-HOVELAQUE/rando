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

  return (
    <Card style={{ width: "18rem", margin: "15px" }} border="dark">
      <Card.Img
        variant="top"
        // src="https://res.cloudinary.com/dhov1sjr7/image/upload/v1628178101/chalune_za0zd4.jpg"
        src="./chalune2.jpg"
      />
      <Card.Body>
        <Card.Title bsPrefix="title-place">{placeData.name}</Card.Title>
        <Card.Text>Massif: {placeData.mountainLocation}</Card.Text>
        <Card.Text>Altitude: {placeData.altitudeInMeters}m</Card.Text>
      </Card.Body>
    </Card>
  );
}
