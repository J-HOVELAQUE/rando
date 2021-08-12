import ListGroup from "react-bootstrap/ListGroup";
import "./hikingSheetStyle.css";
import "../App.css";

export default function HikingSheet() {
  return (
    <>
      <div className="display">
        <h1 className="hikingTitle">Sortie à la Pointe de Chalune</h1>
        <div className="hikingBox">
          <img
            // src="https://res.cloudinary.com/dhov1sjr7/image/upload/v1628178101/chalune_za0zd4.jpg"
            src="./resized.jpg"
            alt="une photo du lieu de la randonée"
            className="hikingSheetImage"
          ></img>
          <div className="hikingData">
            <h3>Dénivelé cumulé: 500m</h3>
            <h3>Distance: 7km</h3>
            <h3>Altitude de départ: 1500m</h3>
            <h3>Altitude d'arrivé: 2000m</h3>
            <h3>Durée de la sortie: 5h</h3>
            <h3>Date de la sortie: 27 juillet 2021</h3>
          </div>
        </div>
        <div className="hikingBox">
          <div className="participantsBox">
            <h3 className="bottomTitle">Participants: </h3>
            <ListGroup className="participantsList">
              <ListGroup.Item className="participant">
                Julien Hovelaque
              </ListGroup.Item>
              <ListGroup.Item>Jean Bon</ListGroup.Item>
              <ListGroup.Item>Marie Golotte</ListGroup.Item>
            </ListGroup>
          </div>
          <div className="descBox">
            <h3 className="bottomTitle">Description: </h3>
            <p>C'était très beau et on s'est bien amusé.</p>
          </div>
        </div>
      </div>
    </>
  );
}
