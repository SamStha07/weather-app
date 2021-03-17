import axios from 'axios';
import { useState } from 'react';
import './App.css';

const apiKeys = {
  key: '424cc54aeb934f5e8b0154057211703',
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [error, setError] = useState('');

  const getWeather = async (e) => {
    e.preventDefault();

    try {
      const {
        data,
      } = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKeys.key}&q=${query}
        `);

      setWeather(data);
      setQuery('');
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className='form'>
        <form>
          <input
            type='text'
            id='city'
            placeholder='Enter City Name'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type='submit' onClick={getWeather}>
            Get Weather
          </button>
        </form>
      </div>

      {error ? (
        <div className='error'>{error}</div>
      ) : (
        <>
          <div className='title'>
            {weather && weather.location && weather.location.name}
          </div>
          <div className='main'>
            {weather && weather.current && (
              <div>
                <img src={weather.current.condition.icon} alt='' />
                <div>Humidity: {weather.current.humidity}%</div>
                <div>
                  Temperature: {weather.current.temp_c}
                  <span>&#8451;</span>
                </div>
                <div>Wind: {weather.current.wind_kph} km/h</div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default App;
