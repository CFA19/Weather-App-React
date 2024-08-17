import { useState } from 'react'

//TODO: esto no se hace se pone en un file en la raiz del proyecto en un file .env y se accede con process.env.REACT_APP_API_KEY y se ignora en el .gitignore
const API_KEY = 'f735c4bd559feab89881757d990db5dd'

export const WeatherApp = () => {
  // TODO: encontré este endpoint que es mejor que el que estas usando, da mas información
  // var url = "https://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent( city ) + "&cnt=1" "&lang=" + "es" + "&APPID=" + APIKEY;

  const [ciudad, setCiudad] = useState('')
  const [dataClima, setDataClima] = useState(null)

  // TODO: Acostumbrate a hacer todo en ingles

  const handleChange = (event) => {
    setCiudad(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (ciudad.length > 0) fetchClima()
  }

  const fetchClima = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          ciudad
        )}&cnt=1&lang=es&APPID=${API_KEY}`
      )
      const data = await response.json()
      console.log(data)
      setDataClima(data)
    } catch (error) {
      console.error('Ocurrio el siguiente problema: ', error)
    }
  }

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
          <h2>Información de {dataClima.name}</h2>
          <div
            style={{
              display: 'grid',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <div>
              Temperatura: {(dataClima.main.temp - 273.15).toFixed(2)}°C
            </div>
            <div>
              Sensación térmica:{' '}
              {(dataClima.main.feels_like - 273.15).toFixed(2)}°C
            </div>
            <div>Humedad : {dataClima.main.humidity}%</div>
            <div>Presión : {dataClima.main.pressure} hPa</div>
            <div>
              Amanece:{' '}
              {new Date(dataClima.sys.sunrise * 1000).toLocaleTimeString()}
            </div>
            <div>
              Atardece:{' '}
              {new Date(dataClima.sys.sunset * 1000).toLocaleTimeString()}
            </div>
          </div>
          <p>País: {dataClima.sys.country}</p>
          <p>Latitud: {dataClima.coord.lat}</p>
          <p>Longitud: {dataClima.coord.lon}</p>
          {dataClima.weather[0] && (
            <p>Estado: {dataClima.weather[0].description} </p>
          )}
        </div>
      )}
    </div>
  )
}
