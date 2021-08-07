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
        <Navbar bg="dark" variant="dark" className="navContainer">
          <Nav.Link href="/" className="navItemRando">
            Home
          </Nav.Link>
          <Nav.Link href="/lieux" className="navItemRando">
            Lieux
          </Nav.Link>
          <Nav.Link href="/rando" className="navItemRando">
            Rando
          </Nav.Link>
          <Nav.Link href="/participants" className="navItemRando">
            Participants
          </Nav.Link>
          <Nav.Link href="#" className="navItemRando">
            Connection
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
