import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import RandoNavBar from "./randoNavBar/RandoNavBar";

function App() {
  return (
    <>
      {/* <Router history={history}>
        <RandoNavBar />
        <Switch>
          <Route path="/" exact component={PlacesScreen} />
          <Route path="/hiking-sheet" exact component={HikingMap} />
        </Switch>
        <PlacesScreen />
      </Router> */}

      <RandoNavBar />
    </>
  );
}

export default App;
