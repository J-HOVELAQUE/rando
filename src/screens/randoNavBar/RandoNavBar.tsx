import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./RandoNavBar.css";
import { Route, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

export default function RandoNavBar() {
  return (
    <>
      <Navbar variant="dark" className="nav-container-rando">
        <NavDropdown title="Lieux" id="nav-dropdown" className="nav-item-rando">
          <div className="dropdown-body">
            <Link to="/lieux" className="nav-item-rando-dropdown">
              Liste
            </Link>

            <Link to="/place-map" className="nav-item-rando-dropdown">
              Carte
            </Link>
          </div>
        </NavDropdown>

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
