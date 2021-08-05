import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import HikingMap from "./hikingMap/HikingMap";
import PlacesScreen from "./placesScreen/PlacesScreen";
import RandoNavBar from "./randoNavBar/RandoNavBar";

function App() {
  return (
    <>
      <RandoNavBar />
      <PlacesScreen />
    </>
  );
}

export default App;
