import { Container, Button } from "react-bootstrap";
import MyNavbar from "./MyNavbar";
// import BgImage from "../assets/wallpaperflare.com_wallpapermain.jpg";
import MyFooter from "./MyFooter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MyHome = () => {
  const [weatherLocation, setWeatherLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (weatherLocation.trim() !== "") {
      navigate(`/weather/${weatherLocation}`);
    }
  };
  const handleChange = (e) => {
    setWeatherLocation(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && weatherLocation.trim() !== "") {
      handleSubmit(e);
    }
  };

  return (
    <div className="mainDiv d-flex flex-column justify-content-between">
      <MyNavbar />
      <Container fluid className="text-center text-white flex-column align-content-center">
        <h1 className="fw-bold mb-3">
          <span className="text-warning">Sun</span> or <span className="text-custom">Storms</span>, Stay Informed!
        </h1>
        <span className=" fs-5">What's the weather in </span>
        <input
          className="bg-transparent border-0 border-bottom text-white fw-bold mb-3 fs-5"
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          placeholder=""
          style={{ width: "110px" }}
        />
        <span className="fw-bold">?</span>
        <Button className=" d-md-none ms-2 rounded-pill" variant="outline-light" onClick={handleSubmit}>
          Go!
        </Button>
      </Container>
      <MyFooter />
    </div>
  );
};

export default MyHome;
