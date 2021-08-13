import { Navbar, Nav } from "react-bootstrap";
import "./RandoNavBar.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Home from "../home";
import PlacesScreen from "../placesScreen";
import HikingSheet from "../hikingSheet";
import ParticipantsScreen from "../participantsScreen";

export default function RandoNavBar(props) {
  return (
    <>
      <BrowserRouter>
        <Navbar variant="dark" className="nav-container-rando">
          <Nav.Link href="/" className="nav-item-rando">
            Home
          </Nav.Link>
          <Nav.Link href="/lieux" className="nav-item-rando">
            Lieux
          </Nav.Link>
          <Nav.Link href="/rando" className="nav-item-rando">
            Rando
          </Nav.Link>
          <Nav.Link href="/participants" className="nav-item-rando">
            Participants
          </Nav.Link>
          <Nav.Link href="#" className="nav-item-rando">
            Connexion
          </Nav.Link>
        </Navbar>

        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/rando" component={HikingSheet} />
          <Route path="/lieux" component={PlacesScreen} />
          <Route path="/participants" component={ParticipantsScreen} />

          {/* Not Found */}
          <Route component={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
