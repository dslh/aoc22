import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

import { Outlet } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const App = () => (
  <>
    <Navbar bg="light" expand="sm">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            🎄 AoC22
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Days" id="basic-navbar-dropdown">
              <LinkContainer to="/days/1">
                <NavDropdown.Item>Day 1</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container>
      <Outlet />
    </Container>
  </>
);

export default App;
