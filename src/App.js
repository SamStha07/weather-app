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
      console.log(data);
      setQuery('');
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className='container'>
        <form className='form'>
          <input
            className='inputCity'
            type='text'
            id='city'
            placeholder='Enter City Name'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className='btn' type='submit' onClick={getWeather}>
            Get Weather
          </button>
        </form>

        {error ? (
          <div className='error'>No results found</div>
        ) : (
          <>
            <div className='title'>
              {weather && weather.location && weather.location.name}
            </div>

            <div className='summary'>
              {weather && weather.current && (
                <div>
                  <img
                    className='image'
                    src={weather.current.condition.icon}
                    alt=''
                  />
                  <div className='condition'>
                    {weather.current.condition.text}
                  </div>

                  <div className='details'>
                    Humidity: {weather.current.humidity}%
                  </div>
                  <div className='details'>
                    Temperature: {weather.current.temp_c}
                    <span>&#8451;</span>
                  </div>
                  <div className='details'>
                    Wind: {weather.current.wind_kph} km/h
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
