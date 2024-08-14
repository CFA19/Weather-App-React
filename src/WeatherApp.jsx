import { useState } from "react";

export const WeatherApp = () => {
  const urlBase = "http://api.openweathermap.org/geo/1.0/direct";
  const API_KEY = "f735c4bd559feab89881757d990db5dd";

  const [ciudad, setCiudad] = useState("");
  const [dataClima, setDataClima] = useState(null);

  const handleChange = (event) => {
    setCiudad(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (ciudad.length > 0) fetchClima();
  };

  const fetchClima = async () => {
    try {
      const response = await fetch(
        `${urlBase}?q=${ciudad}&limit=1&appid=${API_KEY}`
      );
      const data = await response.json();
      setDataClima(data);
    } catch (error) {
      console.error("Ocurrio el siguiente problema: ", error);
    }
  };

  return (
    <div className="container">
      <h1>Aplicacion del Clima</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ciudad}
          onChange={handleChange}
          placeholder="Ingrese la ciudad"
        />
        <button type="submit"> Buscar </button>
      </form>
      {dataClima && (
        <div>
          <h2>Información de {dataClima[0].name}</h2>
          <p>País: {dataClima[0].country}</p>
          <p>Latitud: {dataClima[0].lat}</p>
          <p>Longitud: {dataClima[0].lon}</p>
          {dataClima[0].state && <p>Estado: {dataClima[0].state}</p>}
        </div>
      )}
    </div>
  );
};
