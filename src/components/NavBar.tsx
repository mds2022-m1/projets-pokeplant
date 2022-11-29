import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useAppSelector } from "../app/hooks";
import { LogOut } from "../utils/LogOut";

export function NavBar() {
  const userId = useAppSelector((state) => state.user.id);
  console.log(userId);
  return (
    <Navbar variant="light" fixed="top">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src="icon.png"
            height="30"
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/map">Map</Nav.Link>
            {userId !== undefined && (
              <NavDropdown title="Pokeplants" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/capture">Capture</NavDropdown.Item>
                <NavDropdown.Item href="/battle">Battle</NavDropdown.Item>
                <NavDropdown.Item href="/pokedex">Pokedex</NavDropdown.Item>
                <NavDropdown.Item href="/pokeplants">
                  Pokeplants
                </NavDropdown.Item>
                <NavDropdown.Item href="/teams">Teams</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Nav>
            <NavDropdown title="Account" id="collasible-nav-dropdown">
              {userId === undefined && (
                <>
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                  <NavDropdown.Item href="/register">Register</NavDropdown.Item>  
                </>
              )}
              {userId !== undefined && (
                <>
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="#"
                    className="text-danger"
                    onClick={LogOut}
                  >
                    Log Out
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
