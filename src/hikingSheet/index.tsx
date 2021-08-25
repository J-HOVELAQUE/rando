import ListGroup from "react-bootstrap/ListGroup";
import { Hike } from "../interfaces/hike";
import RootState from "../reducers/interface";
import "./hikingSheetStyle.css";
import "../App.css";

import { connect, DefaultRootState } from "react-redux";

interface HikingSheetProps {
  activeHike: Hike | null;
}

function HikingSheet({ activeHike }: HikingSheetProps) {
  console.log(">>>>>>>HIKE_SELECTED", activeHike);

  return (
    <>
      <div className="display">
        <h1 className="hiking-title">Sortie à la Pointe de Chalune</h1>
        <div className="hiking-box">
          <img
            src="/montain_default.jpg"
            alt="une photo du lieu de la randonée"
            className="hiking-sheet-image"
          ></img>
          <div className="hiking-data">
            <h3>Dénivelé cumulé: 500m</h3>
            <h3>Distance: 7km</h3>
            <h3>Altitude de départ: 1500m</h3>
            <h3>Altitude d'arrivé: 2000m</h3>
            <h3>Durée de la sortie: 5h</h3>
            <h3>Date de la sortie: 27 juillet 2021</h3>
          </div>
        </div>
        <div className="hiking-box">
          <div className="participants-box">
            <h3 className="hiking-sheet-bottom-title">Participants: </h3>
            <ListGroup>
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
    </>
  );
}

function mapStateToProps(state: RootState) {
  return {
    activeHike: state.activeHike,
  };
}

export default connect(mapStateToProps, null)(HikingSheet);
