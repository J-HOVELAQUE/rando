import ListGroup from "react-bootstrap/ListGroup";
import { Hike } from "../../interfaces/hike";
import { RootState } from "../../reducers/interface";
import "./hikingSheetStyle.css";
import givePrettyDate from "../../services/prettyDate";

import { connect } from "react-redux";

interface HikingSheetProps {
  activeHike: Hike | null;
}

function HikingSheet({ activeHike }: HikingSheetProps) {
  return (
    <>
      {activeHike !== null ? (
        <div className="display">
          <h1 className="hiking-title">Sortie à la Pointe de Chalune</h1>
          <div className="hiking-box">
            <img
              src="/montain_default.jpg"
              alt="une photo du lieu de la randonée"
              className="hiking-sheet-image"
            ></img>
            <div className="hiking-data">
              <h3>Dénivelé cumulé: {activeHike.elevationInMeters}m</h3>
              <h3>Distance: {activeHike.distanceInMeters}m</h3>
              <h3>Altitude de départ: {activeHike.startingAltitude}m</h3>
              <h3>Altitude d'arrivé: {activeHike.arrivalAltitude}m</h3>
              <h3>Durée de la sortie: {activeHike.durationInMinutes}min</h3>
              <h3>Date de la sortie: {givePrettyDate(activeHike.date)}</h3>
            </div>
          </div>
          <div className="hiking-box">
            <div className="participants-box">
              <h3 className="hiking-sheet-bottom-title">Participants: </h3>
              <ListGroup>
                {activeHike.participants.map((participant) => {
                  <ListGroup.Item className="participant">
                    {`${participant.firstname} ${participant.name}`}
                  </ListGroup.Item>;
                })}
                <ListGroup.Item className="participant">
                  Julien Hovelaque
                </ListGroup.Item>
                <ListGroup.Item>Jean Bon</ListGroup.Item>
                <ListGroup.Item>Marie Golotte</ListGroup.Item>
              </ListGroup>
            </div>
            <div className="desc-box">
              <h3 className="hiking-sheet-bottom-title">Description: </h3>
              <p>C'était très beau et on s'est bien amusé.</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function mapStateToProps(state: RootState) {
  return {
    activeHike: state.activeHike,
  };
}

export default connect(mapStateToProps, null)(HikingSheet);