import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

import { Outlet } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const Day = ({ day }) => (
  <LinkContainer to={`/days/${day}`}>
    <NavDropdown.Item>Day {day}</NavDropdown.Item>
  </LinkContainer>
);

const App = () => (
  <>
    <Navbar bg="info bg-gradient" expand="sm">
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
              <Day day={1} />
              <Day day={2} />
              <Day day={3} />
              <Day day={4} />
              <Day day={5} />
              <Day day={6} />
              <Day day={7} />
              <Day day={8} />
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
