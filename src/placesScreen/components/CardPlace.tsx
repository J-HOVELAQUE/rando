import { Card, Button } from "react-bootstrap";
import "./cardStyle.css";

export default function CardPlace(props) {
  return (
    <Card style={{ width: "18rem", margin: "15px" }} border="dark">
      <Card.Img
        variant="top"
        src="https://res.cloudinary.com/dhov1sjr7/image/upload/v1628178101/chalune_za0zd4.jpg"
      />
      <Card.Body>
        <Card.Title bsPrefix="title-place">Pointe de Chalune</Card.Title>
        <Card.Text>Massif: Chablais</Card.Text>
        <Card.Text>Altitude: 2014m</Card.Text>
      </Card.Body>
    </Card>
  );
}
