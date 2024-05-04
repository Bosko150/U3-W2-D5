import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyHome from "./components/MyHome";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherDetails from "./components/WeatherDetails";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyHome />} />
          <Route path="/weather/:weatherLocation" element={<WeatherDetails />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
