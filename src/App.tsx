import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createStore, combineReducers, Store } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./home";
import HikingSheet from "./hikingSheet";
import PlacesScreen from "./placesScreen";
import ParticipantsScreen from "./participantsScreen";

import RandoNavBar from "./randoNavBar/RandoNavBar";

import activeHike from "./reducers/activeHike";

const store: Store = createStore(combineReducers({ activeHike }));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <RandoNavBar />
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/rando" component={HikingSheet} />
          <Route path="/lieux" component={PlacesScreen} />
          <Route path="/participants" component={ParticipantsScreen} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
