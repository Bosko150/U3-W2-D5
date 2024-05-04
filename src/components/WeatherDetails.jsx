import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, Navigate } from "react-router-dom";
import MyNavbar from "./MyNavbar";

const WeatherDetails = () => {
  const params = useParams();
  const [coordinates, setCoordinates] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [dailyForecasts, setDailyForecasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherDetails = async () => {
      try {
        const coordinatesResponse = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${params.weatherLocation}&appid=de5fa8054c6c73325e87865f0bc29369`
        );
        const coordinatesData = await coordinatesResponse.json();
        if (coordinatesData && coordinatesData.length > 0) {
          setCoordinates(coordinatesData[0]);

          const currentWeatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coordinatesData[0].lat}&lon=${coordinatesData[0].lon}&appid=de5fa8054c6c73325e87865f0bc29369`
          );
          const currentWeatherData = await currentWeatherResponse.json();
          setCurrentWeather(currentWeatherData);

          const forecastWeatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinatesData[0].lat}&lon=${coordinatesData[0].lon}&appid=de5fa8054c6c73325e87865f0bc29369`
          );
          const forecastWeatherData = await forecastWeatherResponse.json();

          const dailyForecasts = processDailyForecasts(forecastWeatherData.list);
          setDailyForecasts(dailyForecasts);

          setLoading(false);
        } else {
          setError("Location not found");
          setLoading(false);
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchWeatherDetails();
  }, [params.weatherLocation]);

  const processDailyForecasts = (forecastList) => {
    const dailyForecasts = {};

    const today = new Date();
    const todayDate = today.toISOString().split("T")[0];

    forecastList.forEach((forecast) => {
      const date = forecast.dt_txt.split(" ")[0];
      if (date !== todayDate && !dailyForecasts[date]) {
        dailyForecasts[date] = forecast;
      }
    });

    return Object.values(dailyForecasts);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Navigate to="*" />;
  }
  const formatDate = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const day = date.getDate();
    const dayOfWeek = days[date.getDay()];

    return `${dayOfWeek} ${day}`;
  };
  return (
    <div className="weather-div text-dark">
      <MyNavbar />
      <div>
        <Container className="d-flex justify-content-center">
          <Row className="text-center d-flex justify-content-center">
            <Col xs={12}>
              <h1 className="display-3 fw-bold mb-1">{coordinates.name}</h1>
              <h6 className="fs-5">{new Date(currentWeather.dt * 1000).toDateString()}</h6>
            </Col>
            <Col xs={12}>
              <img
                src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`}
                alt="Weather Icon"
                className="img-fluid"
                style={{ maxHeight: "300px", width: "auto" }}
              />
            </Col>
            <Col xs={12}>
              <p className="display-4 fw-bold m-0">{(currentWeather.main.temp - 273.15).toFixed(0)}°</p>
            </Col>
            <Col>
              <span className="me-3 fs-5">{(currentWeather.main.temp_min - 273.15).toFixed(0)}°</span>
              <span className="fs-5">{(currentWeather.main.temp_max - 273.15).toFixed(0)}°</span>
            </Col>
            <h4 className="pt-3 mb-5"> {currentWeather.weather[0].description}</h4>

            <Row className="text-center d-flex justify-content-around p-0 forecast-row">
              {dailyForecasts.map((forecast, index) => (
                <Col key={index} xs={6} md={2} className="p-1">
                  <h2>{formatDate(new Date(forecast.dt * 1000))}</h2>
                  <img
                    src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                    alt="Weather Icon"
                    className="img-fluid"
                  />
                  <p className="fw-bold">{(forecast.main.temp - 273.15).toFixed(0)}°C</p>
                </Col>
              ))}
            </Row>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default WeatherDetails;
