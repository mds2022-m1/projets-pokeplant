import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { supabase } from "../app/supabaseClient";
import { userCreated } from "../features/user-slice";
import { passwordRecoveryUpdated } from "../features/session-slice";
import { FaUserCircle } from "react-icons/fa";
import { RouterPath } from "../app/router-path";

export function NavBar() {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.session.session);
  const username = useAppSelector((state) => state.user.name);
  return (
    <Navbar collapseOnSelect variant="light" fixed="top">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src="icon.png"
            height="30"
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/map">Map</Nav.Link>
            {session ? (
              <NavDropdown title="Pokeplants" id="collasible-nav-dropdown">
                <NavDropdown.Item href={RouterPath.capture}>
                  Capture
                </NavDropdown.Item>
                <NavDropdown.Item href={RouterPath.battle}>
                  Battle
                </NavDropdown.Item>
                <NavDropdown.Item href={RouterPath.pokedex}>
                  Pokedex
                </NavDropdown.Item>
                <NavDropdown.Item href={RouterPath.garden}>
                  My garden
                </NavDropdown.Item>
                <NavDropdown.Item href="/teams">Teams</NavDropdown.Item>
              </NavDropdown>
            ) : null}
          </Nav>
          <Nav>
            <NavDropdown
              title={
                username === "" ? (
                  <>
                    <FaUserCircle size={30} />
                  </>
                ) : (
                  <>
                    <FaUserCircle size={30} />
                    <span> {username}</span>
                  </>
                )
              }
              id="collasible-nav-dropdown"
            >
              {!session ? (
                <>
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item href="/account">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="#"
                    className="text-danger"
                    onClick={() => {
                      supabase.auth.signOut();
                      dispatch(userCreated({ name: "", id: "" }));
                      dispatch(passwordRecoveryUpdated(false));
                    }}
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
