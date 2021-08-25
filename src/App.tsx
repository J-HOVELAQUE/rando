import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createStore, combineReducers, Store } from "redux";
import { Provider } from "react-redux";

import RandoNavBar from "./randoNavBar/RandoNavBar";

import activeHike from "./reducers/activeHike";

const store: Store = createStore(combineReducers({ activeHike }));

function App() {
  return (
    <Provider store={store}>
      <RandoNavBar />
    </Provider>
  );
}

export default App;
