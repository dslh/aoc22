import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

import { Outlet } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import dayTitle from 'lib/day-title';

const Day = ({ day, title }) => (
  <LinkContainer to={`/days/${day}`}>
    <NavDropdown.Item>
      <div style={{ width: '1em', textAlign: 'right', display: 'inline-block' }}>{day}</div>
      <> – {dayTitle(day)}</>
    </NavDropdown.Item>
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
              {[...Array(25)].map((_,i) => <Day key={i} day={i + 1} />)}
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
