import { Navbar, Nav } from "react-bootstrap";
import "./RandoNavBar.css";
import { Route, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

export default function RandoNavBar() {
  return (
    <>
      <Navbar variant="dark" className="nav-container-rando">
        <Link to="/" className="nav-item-rando">
          Home
        </Link>
        <Link to="/lieux" className="nav-item-rando">
          Lieux
        </Link>
        <Link to="/rando" className="nav-item-rando">
          Rando
        </Link>
        <Link to="/participants" className="nav-item-rando">
          Participants
        </Link>
        <Nav.Link href="#" className="nav-item-rando">
          Connexion
        </Nav.Link>
      </Navbar>

      <Route component={() => <Redirect to="/" />} />
    </>
  );
}
