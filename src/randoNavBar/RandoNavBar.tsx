import { Navbar, Nav } from "react-bootstrap";
import "./RandoNavBar.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import Home from "../home";
import PlacesScreen from "../placesScreen";
import HikingSheet from "../hikingSheet";
import ParticipantsScreen from "../participantsScreen";

export default function RandoNavBar(props) {
  return (
    <>
      <Navbar variant="dark" className="nav-container-rando">
        {/* <Nav.Link href="/" className="nav-item-rando"> */}
        <Link to="/" className="nav-item-rando">
          Home
        </Link>
        {/* </Nav.Link> */}
        {/* <Nav.Link className="nav-item-rando"> */}
        <Link to="/lieux" className="nav-item-rando">
          Lieux
        </Link>
        {/* </Nav.Link> */}
        {/* <Nav.Link href="/rando" className="nav-item-rando"> */}
        <Link to="/rando" className="nav-item-rando">
          Rando
        </Link>
        {/* </Nav.Link> */}
        {/* <Nav.Link href="/participants" className="nav-item-rando"> */}
        <Link to="/participants" className="nav-item-rando">
          Participants
        </Link>
        {/* </Nav.Link> */}
        <Nav.Link href="#" className="nav-item-rando">
          Connexion
        </Nav.Link>
      </Navbar>

      {/* Not Found */}
      <Route component={() => <Redirect to="/" />} />
    </>
  );
}
