import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faTemperatureHigh, faThermometerHalf, faTint, faCompressArrowsAlt, faMapMarkerAlt, faCloudSun } from "@fortawesome/free-solid-svg-icons";

export const WeatherApp = () => {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";

  const API_KEY = `${process.env.REACT_APP_API_KEY}`;
  console.log(API_KEY);

  const [city, setCity] = useState("")
  const [data, setData] = useState(null)

  const handleChange = (event) => {
    setCity(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (city.length > 0) fetchClima();
  }

  const fetchClima = async () => {
    try {
      const response = await fetch(
        `${urlBase}?q=${encodeURIComponent(city)}&lang=es&appid=${API_KEY}`
      )
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Ocurrió el siguiente problema: ", error);
    }
  }


  return (
    <div className="container">
      <h1>Aplicación del Clima</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Ingrese la ciudad"
        />
        <button type="submit">Buscar</button>
      </form>
      {data && (
        <>
          <h2>Información de {data.name}</h2>
          <div
            style={{
              display: "grid",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div>
              <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "red" }} /> Latitud: {data.coord ? data.coord.lat : "N/A"}
            </div>
            <div>
              <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "red" }} /> Longitud: {data.coord ? data.coord.lon : "N/A"}
            </div>
          </div>
          {data.main && (
            <>
              <div>
                <FontAwesomeIcon icon={faTemperatureHigh} style={{ color: "orange" }} /> Temperatura: {data.main.temp.toFixed(2)}°C
              </div>
              <div>
                <FontAwesomeIcon icon={faThermometerHalf} style={{ color: "orange" }} /> Sensación térmica: {data.main.feels_like.toFixed(2)}°C
              </div>
              <div>
                <FontAwesomeIcon icon={faTint} style={{ color: "blue" }} /> Humedad: {data.main.humidity}%
              </div>
              <div>
                <FontAwesomeIcon icon={faCompressArrowsAlt} style={{ color: "gray" }} /> Presión: {data.main.pressure} hPa
              </div>
            </>
          )}
          {data.sys && (
            <>
              <div>
                <FontAwesomeIcon icon={faSun} style={{ color: "yellow" }} /> Amanece: {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
              </div>
              <div>
                <FontAwesomeIcon icon={faMoon} style={{ color: "purple" }} /> Atardece: {new Date(data.sys.sunset * 1000).toLocaleTimeString()}
              </div>
              <p>
                <FontAwesomeIcon icon={faCloudSun} style={{ color: "green" }} /> País: {data.sys.country}
              </p>
            </>
          )}
          {data.weather && data.weather[0] && (
            <p>
              <FontAwesomeIcon icon={faCloudSun} style={{ color: "gray" }} /> Estado: {data.weather[0].description}
            </p>
          )}
        </>
      )}
    </div>
  );
};
