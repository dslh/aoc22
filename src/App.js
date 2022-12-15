import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

import { Outlet } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const Day = ({ day, title }) => (
  <LinkContainer to={`/days/${day}`}>
    <NavDropdown.Item>
      <div style={{ width: '1em', textAlign: 'right', display: 'inline-block' }}>{day}</div> – {title}
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
              <Day day={1} title="Calorie Counting" />
              <Day day={2} title="Rock Paper Scissors" />
              <Day day={3} title="Rucksack Reorganization" />
              <Day day={4} title="Camp Cleanup" />
              <Day day={5} title="Supply Stacks" />
              <Day day={6} title="Tuning Trouble" />
              <Day day={7} title="No Space Left On Device" />
              <Day day={8} title="Treetop Tree House" />
              <Day day={9} title="Rope Bridge" />
              <Day day={10} title="Cathode-Ray Tube" />
              <Day day={11} title="Monkey in the Middle" />
              <Day day={12} title="Hill Climbing Algorithm" />
              <Day day={13} title="Distress Signal" />
              <Day day={14} title="Regolith Reservoir" />
              <Day day={15} title="Beacon Exclusion Zone" />
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
