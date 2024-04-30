import { Container, Nav, Navbar } from "react-bootstrap";
import { FaCartShopping } from "react-icons/fa6";
import AddProducts from "./AddProducts";
import AddCategories from "./AddCategories";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/">Red & White</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link>
                <AddCategories />
              </Nav.Link>
              <Nav.Link>
                <AddProducts />
              </Nav.Link>
            </Nav>
            <Link to="/cart">
              <FaCartShopping />
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default Navigation;
