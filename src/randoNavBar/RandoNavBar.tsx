import { Navbar, Nav, Container } from "react-bootstrap";
import "./RandoNavBar.css";

export default function RandoNavBar(props) {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="navContainer">
        <Nav.Link href="#" className="navItemRando">
          Home
        </Nav.Link>
        <Nav.Link href="#" className="navItemRando">
          Lieux
        </Nav.Link>
        <Nav.Link href="#" className="navItemRando">
          Randos
        </Nav.Link>
        <Nav.Link href="#" className="navItemRando">
          Participants
        </Nav.Link>
        <Nav.Link href="#" className="navItemRando">
          Connection
        </Nav.Link>
      </Navbar>
    </>
  );
}
