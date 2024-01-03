import { Container, Nav, NavDropdown } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import ModalLogin from "./components/modalLogin";
import { UserContext } from "./userContext";

function Layout() {
  const [show, setShow] = useState();
  const { setUser } = useContext(UserContext);


  const loginDone = (id) => {
    setUser(id);
    setShow(false);
  }

  return (
    <>
    <ModalLogin show={show} callBackSuccess={loginDone} callBackFail={() => setShow(false)} />
      <Container>
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          >
            <span className="fs-4">Deel Frontend Test</span>
          </a>

          <Nav variant="pills">
            <NavDropdown title="Contractor" id="nav-dropdown">
              <NavDropdown.Item href="/contractors/getById">
                Get By ID
              </NavDropdown.Item>
              <NavDropdown.Item href="/contractors/getAll">
                Get ALL
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/jobs/unpaid">
              Jobs Unpaid
            </Nav.Link>
            {/* <NavDropdown title="Jobs" id="nav-dropdown">
              <NavDropdown.Item href="/jobs/unpaid">
                Get all unpaid
              </NavDropdown.Item>
              <NavDropdown.Item href="/contractors/getAll">
                Pay a job
              </NavDropdown.Item>
            </NavDropdown> */}

            <Nav.Link href="/deposit">
              Deposit
            </Nav.Link>

            <NavDropdown title="Admin" id="nav-dropdown">
              <NavDropdown.Item href="/admin/best-profission">
                Best Profission
              </NavDropdown.Item>
              {/* <NavDropdown.Item href="/admin/best-clients">
                Best Clients
              </NavDropdown.Item> */}
            </NavDropdown>

            <Nav.Item>
              <Nav.Link className="bg-warning text-dark rounded" onClick={() => setShow(true)}>
                Login
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </header>
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;
