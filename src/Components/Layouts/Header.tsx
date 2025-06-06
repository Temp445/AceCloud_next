
import { Navbar, Nav } from "react-bootstrap";
import "./Header.css";
import Logo from "../../assets/AceLogo.png";
import Image from "next/image";

const Header = () => {
  return (
    <>
      <Navbar  expand="lg"  className="header "  >

          <Navbar.Brand href="#"  className="d-flex align-items-center">
            <Image src={Logo} alt="Logo" className="logo-img" />
            <span className="logo-text">ACE Software Solutions <span className="pvt">Pvt. Ltd.</span></span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggle" />
          <Navbar.Collapse id="basic-navbar-nav" className="capsule">
            <Nav className="ms-auto nav">
              <Nav.Link href="#services"  className="about-color">Our Products</Nav.Link>
              <Nav.Link href="#about" className="color">About Us</Nav.Link>
              <Nav.Link href="#talk-to-us" className="color">Talk to Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
