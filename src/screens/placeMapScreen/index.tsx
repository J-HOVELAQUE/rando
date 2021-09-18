import HikingMap from "./hikingMap/HikingMap";
import "./placeMapScreenStyle.css";

export default function PlaceMapScreen() {
  return (
    <>
      <h1 className="hiking-title">Carte des lieux de randonnée</h1>
      <div className="map-display">
        <HikingMap />
      </div>
    </>
  );
}
