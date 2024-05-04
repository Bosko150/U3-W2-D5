import { Navbar, Container } from "react-bootstrap";
import Logo from "../assets/OIG2-removebg-preview.png";
import { useNavigate } from "react-router-dom";

const MyNavbar = () => {
  const navigate = useNavigate();

  return (
    <Navbar className="bg-transparent">
      <Container fluid>
        <Navbar.Brand onClick={() => navigate("/")}>
          <img src={Logo} width="80" height="80" className="d-inline-block align-top" alt="logo" />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
