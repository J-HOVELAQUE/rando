import {Navbar, Nav, Container}  from 'react-bootstrap'

export default function RandoNavBar(props) {
  return (
    <>
      <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#">Rando</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="#">Home</Nav.Link>
      <Nav.Link href="#">Lieux</Nav.Link>
            <Nav.Link href="#">Randos</Nav.Link>
            <Nav.Link href="#">Participants</Nav.Link>
      <Nav.Link href="#">Connection</Nav.Link>
            
            
    </Nav>
    </Container>
  </Navbar>
 
    </>
    
  )
}