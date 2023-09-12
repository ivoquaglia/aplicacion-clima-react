import { useState } from "react"


export const WheatherApp = () => {

    const key = "244fead2c89de08ce4ac1bb34bc6f64c";
    const urlBase = "https://api.openweathermap.org/data/2.5/weather";
    const diffKelvin = 273.15;

    const [ciudad, setciudad] = useState("")
    const [dataClima, setdataClima] = useState(null)
    const handleCambioCiudad = (e) => {
        setciudad(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (ciudad.length > 0) {fetchClima()};
    }
    const fetchClima = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${key}`)
            const data = await response.json()
            setdataClima(data)
        }
        catch (error) {
            console.error(`ocurrio el siguiente problema: `, error)
        }
    }


        return (
            <>
                <div className="container">
                    <h1>Aplicacion del Clima</h1>

                    <form onSubmit={handleSubmit} >
                        <input
                            type="text"
                            value={ciudad}
                            onChange={handleCambioCiudad}
                        />
                        <button type="submit">Buscar</button>
                    </form>
                    {
                        dataClima && (
                            <div>
                                <h2>{dataClima.name}</h2>
                                <p>Temperatura: {parseInt(dataClima?.main?.temp - diffKelvin)}°C</p>
                                <p>Condicion Meteorologica: {dataClima.weather[0].description}</p>
                                <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}/>
                            </div>
                        )
                    }
                </div>
            </>
        )
    }
