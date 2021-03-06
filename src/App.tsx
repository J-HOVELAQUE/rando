import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createStore, combineReducers, Store } from "redux";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";
import Home from "./screens/home";
import HikingSheet from "./screens/hikingSheet";
import PlacesScreen from "./screens/placesScreen";
import ParticipantsScreen from "./screens/participantsScreen";
import HikingMap from "./screens/placeMapScreen/hikingMap/HikingMap";
import PlaceMapScreen from "./screens/placeMapScreen";

import RandoNavBar from "./screens/randoNavBar/RandoNavBar";

import activeHike from "./reducers/activeHike";

const store: Store = createStore(combineReducers({ activeHike }));

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <RandoNavBar />
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/rando" component={HikingSheet} />
          <Route path="/lieux" component={PlacesScreen} />
          <Route path="/participants" component={ParticipantsScreen} />
          <Route path="/place-map" component={PlaceMapScreen} />
        </Switch>
      </HashRouter>
    </Provider>
  );
}

export default App;
