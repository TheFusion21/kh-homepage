import React, { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';
import {
  TbSearch,
  TbGps,
} from 'react-icons/tb';
import { Forecast, Weather } from './types';
import * as Wi from 'react-icons/wi';
import useLocalStorage from '../utils/useLocalStorage';
interface Location {
  latitude: number;
  longitude: number;
}
const App = () => {
  const [location, setLocation] = useLocalStorage<Location | null>('weather-location', null);
  const [useLocation, setUseLocation] = useLocalStorage('weather-location-enabled', false);
  const [search, setSearch] = useLocalStorage('weather-search', '');
  const [debouncedSearch] = useDebounce(search, 500);
  const [locations, setLocations] = useState<any[]>([]);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [forecastSlider, setForecastSlider] = useState(0);

  // get geocoding from search
  useEffect(() => {
    if (debouncedSearch) {
      fetch(`/direct?q=${debouncedSearch}`)
        .then((res) => res.json())
        .then((data) => {
          setLocations(data);
        });
    }
  }, [debouncedSearch]);

  // get weather from location
  useEffect(() => {
    if (location) {
      fetch(`/weather?lat=${location.latitude}&lon=${location.longitude}`)
        .then((res) => res.json())
        .then((data) => {
          setWeather(data as Weather);
        });
      fetch(`/forecast?lat=${location.latitude}&lon=${location.longitude}`)
        .then((res) => res.json())
        .then((data) => {
          setForecast(data as Forecast);
        });
    }
  }, [location]);

  // try to get location when useLocation is set to true
  useEffect(() => {
    if (useLocation) {
      setSearch('');
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }, () => {
        setUseLocation(false);
      }, {
        enableHighAccuracy: false,
        maximumAge: 3000,
        timeout: 5000,
      });
    }
  }, [useLocation]);

  // if search is inputted, set useLocation to false
  useEffect(() => {
    if (search) {
      setUseLocation(false);
    }
  }, [search]);

  const handleLocationSelect = (location: any) => {
    setLocation({
      latitude: location.lat,
      longitude: location.lon,
    });
    setUseLocation(false);
    setLocations([]);
    setSearch('');
  };

  const weatherIcon = useMemo(() => {
    const id = weather?.weather[0].id ?? 0;
    if (id < 300) {
      return <Wi.WiThunderstorm className="w-12 h-12"/>;
    } else if (id < 400) {
      return <Wi.WiSprinkle className="w-12 h-12"/>;
    } else if (id < 600) {
      return <Wi.WiRain className="w-12 h-12"/>;
    } else if (id < 700) {
      return <Wi.WiSnow className="w-12 h-12"/>;
    } else if (id < 800) {
      return <Wi.WiFog className="w-12 h-12"/>;
    } else if (id === 800) {
      return <Wi.WiDaySunny className="w-12 h-12"/>;
    } else if (id < 900) {
      return <Wi.WiCloudy className="w-12 h-12"/>;
    } else {
      return <Wi.WiCloudyGusts className="w-12 h-12"/>;
    }
  }, [weather]);

  const windSpeedIcon = useMemo(() => {
    const speed = weather?.wind.speed ?? 0;
    if (speed < 0.3) {
      return <Wi.WiWindBeaufort0 className="w-12 h-12"/>;
    } else if (speed < 1.6) {
      return <Wi.WiWindBeaufort1 className="w-12 h-12"/>;
    } else if (speed < 3.4) {
      return <Wi.WiWindBeaufort2 className="w-12 h-12"/>;
    } else if (speed < 5.5) {
      return <Wi.WiWindBeaufort3 className="w-12 h-12"/>;
    } else if (speed < 8) {
      return <Wi.WiWindBeaufort4 className="w-12 h-12"/>;
    } else if (speed < 10.8) {
      return <Wi.WiWindBeaufort5 className="w-12 h-12"/>;
    } else if (speed < 13.9) {
      return <Wi.WiWindBeaufort6 className="w-12 h-12"/>;
    } else if (speed < 17.2) {
      return <Wi.WiWindBeaufort7 className="w-12 h-12"/>;
    } else if (speed < 20.8) {
      return <Wi.WiWindBeaufort8 className="w-12 h-12"/>;
    } else if (speed < 24.5) {
      return <Wi.WiWindBeaufort9 className="w-12 h-12"/>;
    } else if (speed < 28.5) {
      return <Wi.WiWindBeaufort10 className="w-12 h-12"/>;
    } else if (speed < 32.7) {
      return <Wi.WiWindBeaufort11 className="w-12 h-12"/>;
    } else {
      return <Wi.WiWindBeaufort12 className="w-12 h-12"/>;
    }
  }, [weather]);

  const windDirectionIcon = useMemo(() => {
    const deg = weather?.wind.deg ?? 0;
    return <Wi.WiDirectionUp className="w-12 h-12" style={{ transform: `rotate(${deg}deg)` }}/>;
  }, [weather]);

  const forecastWeather = useMemo(() => {
    if (!forecast) {
      return null;
    }
    // get forecast interpolated from slider
    const forecastIndex = forecast.list.findIndex((forecast) => forecast.dt >= forecastSlider) ?? 0;
    if (forecastIndex === 0) {
      return forecast.list[0];
    }
    const forecastBefore = forecast.list[forecastIndex - 1];
    const forecastAfter = forecast.list[forecastIndex];
    const forecastInterpolated = {
      dt: forecastSlider,
      main: {
        temp: forecastBefore.main.temp + (forecastAfter.main.temp - forecastBefore.main.temp) * (forecastSlider - forecastBefore.dt) / (forecastAfter.dt - forecastBefore.dt),
        feels_like: forecastBefore.main.feels_like + (forecastAfter.main.feels_like - forecastBefore.main.feels_like) * (forecastSlider - forecastBefore.dt) / (forecastAfter.dt - forecastBefore.dt),
        temp_min: forecastBefore.main.temp_min + (forecastAfter.main.temp_min - forecastBefore.main.temp_min) * (forecastSlider - forecastBefore.dt) / (forecastAfter.dt - forecastBefore.dt),
        temp_max: forecastBefore.main.temp_max + (forecastAfter.main.temp_max - forecastBefore.main.temp_max) * (forecastSlider - forecastBefore.dt) / (forecastAfter.dt - forecastBefore.dt),
        pressure: forecastBefore.main.pressure + (forecastAfter.main.pressure - forecastBefore.main.pressure) * (forecastSlider - forecastBefore.dt) / (forecastAfter.dt - forecastBefore.dt),
        humidity: forecastBefore.main.humidity + (forecastAfter.main.humidity - forecastBefore.main.humidity) * (forecastSlider - forecastBefore.dt) / (forecastAfter.dt - forecastBefore.dt),
      },
      clouds: {
        all: forecastBefore.clouds.all + (forecastAfter.clouds.all - forecastBefore.clouds.all) * (forecastSlider - forecastBefore.dt) / (forecastAfter.dt - forecastBefore.dt),
      },
      wind: {
        speed: forecastBefore.wind.speed + (forecastAfter.wind.speed - forecastBefore.wind.speed) * (forecastSlider - forecastBefore.dt) / (forecastAfter.dt - forecastBefore.dt),
        deg: forecastBefore.wind.deg + (forecastAfter.wind.deg - forecastBefore.wind.deg) * (forecastSlider - forecastBefore.dt) / (forecastAfter.dt - forecastBefore.dt),
      },
      rain: forecastBefore.rain ? {
        '1h': forecastBefore.rain['1h'] ? forecastBefore.rain['1h'] + ((forecastAfter.rain?.['1h'] ?? 0) - forecastBefore.rain['1h']) * (forecastSlider - forecastBefore.dt) / (forecastAfter.dt - forecastBefore.dt) : null,
        '3h': forecastBefore.rain['3h'] ? forecastBefore.rain['3h'] + ((forecastAfter.rain?.['3h'] ?? 0) - forecastBefore.rain['3h']) * (forecastSlider - forecastBefore.dt) / (forecastAfter.dt - forecastBefore.dt) : null,
      } : null,
      snow: forecastBefore.snow ? {
        '1h': forecastBefore.snow['1h'] ? forecastBefore.snow['1h'] + ((forecastAfter.snow?.['1h'] ?? 0) - forecastBefore.snow['1h']) * (forecastSlider - forecastBefore.dt) / (forecastAfter.dt - forecastBefore.dt) : null,
        '3h': forecastBefore.snow['3h'] ? forecastBefore.snow['3h'] + ((forecastAfter.snow?.['3h'] ?? 0) - forecastBefore.snow['3h']) * (forecastSlider - forecastBefore.dt) / (forecastAfter.dt - forecastBefore.dt) : null,
      } : null,
      visibility: forecastBefore.visibility + (forecastAfter.visibility - forecastBefore.visibility) * (forecastSlider - forecastBefore.dt) / (forecastAfter.dt - forecastBefore.dt),
    };
    return forecastInterpolated;
  }, [forecastSlider, forecast]);

  const forecastWindSpeedIcon = useMemo(() => {
    const speed = forecastWeather?.wind.speed ?? 0;
    if (speed < 0.3) {
      return <Wi.WiWindBeaufort0 className="w-12 h-12"/>;
    } else if (speed < 1.6) {
      return <Wi.WiWindBeaufort1 className="w-12 h-12"/>;
    } else if (speed < 3.4) {
      return <Wi.WiWindBeaufort2 className="w-12 h-12"/>;
    } else if (speed < 5.5) {
      return <Wi.WiWindBeaufort3 className="w-12 h-12"/>;
    } else if (speed < 8) {
      return <Wi.WiWindBeaufort4 className="w-12 h-12"/>;
    } else if (speed < 10.8) {
      return <Wi.WiWindBeaufort5 className="w-12 h-12"/>;
    } else if (speed < 13.9) {
      return <Wi.WiWindBeaufort6 className="w-12 h-12"/>;
    } else if (speed < 17.2) {
      return <Wi.WiWindBeaufort7 className="w-12 h-12"/>;
    } else if (speed < 20.8) {
      return <Wi.WiWindBeaufort8 className="w-12 h-12"/>;
    } else if (speed < 24.5) {
      return <Wi.WiWindBeaufort9 className="w-12 h-12"/>;
    } else if (speed < 28.5) {
      return <Wi.WiWindBeaufort10 className="w-12 h-12"/>;
    } else if (speed < 32.7) {
      return <Wi.WiWindBeaufort11 className="w-12 h-12"/>;
    } else {
      return <Wi.WiWindBeaufort12 className="w-12 h-12"/>;
    }
  }, [forecastWeather]);

  const forecastWindDirectionIcon = useMemo(() => {
    const deg = forecastWeather?.wind.deg ?? 0;
    return <Wi.WiDirectionUp className="w-12 h-12" style={{ transform: `rotate(${deg}deg)` }}/>;
  }, [forecastWeather]);

  return (
    <div className="select-none relative">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto flex flex-col items-center">
        {/* Searchbar */}
        <div className="flex-col flex w-full bg-black/30 lg:mt-3 lg:rounded-lg">
          <div className="w-full flex flex-row text-sky-100 text-base relative items-center">
            <input
              type="text"
              className="grow w-0 bg-transparent border-0 outline-none h-full pl-2 pr-1 placeholder:text-zinc-300"
              placeholder='Search'
              value={search === '' && weather ? weather.name : search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <TbSearch className={`w-10 h-10 p-2 ${search || !useLocation ? 'text-sky-300' : ''} shrink-0`} />
            <TbGps className={`w-10 h-10 p-2 ${useLocation ? 'text-sky-300' : ''} shrink-0`} onClick={() => setUseLocation(!useLocation)} />
          </div>
          <div>
            {locations.map((location) => (
              <div onClick={() => handleLocationSelect(location)} className="px-2 py-2 hover:bg-black/5 active:bg-black/10">
                {location.name} ({location.country})
              </div>
            ))}
          </div>
        </div>
        {/* Weather */}
        <h1 className="text-4xl font-bold mt-8 text-sky-950">Weather</h1>
        <div className="w-full grid grid-cols-2 gap-4 mt-8 text-sky-950 mx-2">
          <div className="col-span-full items-center backdrop-blur-md p-2 shadow-lg rounded-xl flex flex-col border border-white/10">
            {weatherIcon}
            <h1 className="text-2xl font-bold">{weather?.main.temp.toFixed() ?? '-'}°C</h1>
            <h2 className="text-xl">{weather?.weather[0].description ?? '-'}</h2>
            <span>
              {weather?.main.temp_min.toFixed() ?? '-'}°C / {weather?.main.temp_max.toFixed() ?? '-'}°C
            </span>
            <span>
              feels like {weather?.main.feels_like.toFixed() ?? '-'}°C
            </span>
          </div>
          <div className="col-span-1 items-center backdrop-blur-md p-2 shadow-lg rounded-xl flex flex-col border border-white/10">
            <Wi.WiHumidity className="w-12 h-12"/>
            <h2 className="text-xl">Humidity</h2>
            <span>
              {weather?.main.humidity.toFixed() ?? '-'}%
            </span>
          </div>
          <div className="col-span-1 items-center backdrop-blur-md p-2 shadow-lg rounded-xl flex flex-col border border-white/10">
            {windSpeedIcon}
            <h2 className="text-xl">Wind</h2>
            <span>
              {weather?.wind.speed.toFixed() ?? '-'} m/s
            </span>
          </div>
          <div className="col-span-1 items-center backdrop-blur-md p-2 shadow-lg rounded-xl flex flex-col border border-white/10">
            {windDirectionIcon}
            <h2 className="text-xl">Direction</h2>
            <span>
              {weather?.wind.deg.toFixed() ?? '-'}°
            </span>
          </div>
          <div className="col-span-1 items-center backdrop-blur-md p-2 shadow-lg rounded-xl flex flex-col border border-white/10">
            <Wi.WiBarometer className="w-12 h-12"/>
            <h2 className="text-xl">Pressure</h2>
            <span>
              {weather?.main.pressure.toFixed() ?? '-'} hPa
            </span>
          </div>
          <div className="col-span-1 items-center backdrop-blur-md p-2 shadow-lg rounded-xl flex flex-col border border-white/10">
            <Wi.WiCloud className="w-12 h-12"/>
            <h2 className="text-xl">Clouds</h2>
            <span>
              {weather?.clouds.all.toFixed() ?? '-'}%
            </span>
          </div>
          {weather?.rain ? (
            <div className="col-span-1 items-center backdrop-blur-md p-2 shadow-lg rounded-xl flex flex-col border border-white/10">
              <Wi.WiShowers className="w-12 h-12"/>
              <h2 className="text-xl">Rain</h2>
              <span>
                {weather?.rain?.['1h'] ?? '0'} mm
              </span>
            </div>
          ) : (weather?.snow ? (
            <div className="col-span-1 items-center backdrop-blur-md p-2 shadow-lg rounded-xl flex flex-col border border-white/10">
              <Wi.WiSnow className="w-12 h-12"/>
              <h2 className="text-xl">Rain</h2>
              <span>
                {weather?.snow?.['1h'] ?? '0'} mm
              </span>
            </div>
          ) : (
            <div className="col-span-1 items-center backdrop-blur-md p-2 shadow-lg rounded-xl flex flex-col border border-white/10">
              <Wi.WiRainMix className="w-12 h-12"/>
              <h2 className="text-xl">Rain / Snow</h2>
              <span>
                0 mm
              </span>
            </div>
          ))}
          <div className="col-span-1 items-center backdrop-blur-md p-2 shadow-lg rounded-xl flex flex-col border border-white/10">
            <Wi.WiSunrise className="w-12 h-12"/>
            <h2 className="text-xl">Sunrise</h2>
            <span>
              {(weather && new Date((weather?.sys.sunrise ?? 0) * 1000).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })) ?? '-'}
            </span>
          </div>
          <div className="col-span-1 items-center backdrop-blur-md p-2 shadow-lg rounded-xl flex flex-col border border-white/10">
            <Wi.WiSunset className="w-12 h-12"/>
            <h2 className="text-xl">Sunset</h2>
            <span>
              {(weather && new Date((weather?.sys.sunset ?? 0) * 1000).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })) ?? '-'}
            </span>
          </div>
        </div>
        {/* Forecast */}
        <h1 className="text-4xl font-bold mt-8 text-sky-950">Forecast</h1>
        { /* Time slider */}
        <input
          type="range"
          min={(forecast && forecast.list[0].dt) ?? 0}
          max={(forecast && forecast.list[forecast.list.length-1].dt) ?? 0}
          value={forecastSlider}
          step="1"
          className="w-full mt-4 w-slider mx-4"
          onChange={(e) => setForecastSlider(parseInt(e.target.value))}
        />
        <div className="w-full grid grid-cols-2 gap-4 mt-8 text-sky-950 mx-2">
          <div className="col-span-full items-center backdrop-blur-md p-2 shadow-lg rounded-xl flex flex-col border border-white/10">
            <h1 className="text-2xl font-bold">{forecastWeather?.main.temp.toFixed() ?? '-'}°C</h1>
            <h2 className="text-xl">
              {new Date((forecastWeather?.dt ?? 0) * 1000).toLocaleTimeString(undefined, { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
            </h2>
            <span>
              {forecastWeather?.main.temp_min.toFixed() ?? '-'}°C / {forecastWeather?.main.temp_max.toFixed() ?? '-'}°C
            </span>
            <span>
              feels like {forecastWeather?.main.feels_like.toFixed() ?? '-'}°C
            </span>
          </div>
          <div className="col-span-1 items-center backdrop-blur-md p-2 shadow-lg rounded-xl flex flex-col border border-white/10">
            <Wi.WiHumidity className="w-12 h-12"/>
            <h2 className="text-xl">Humidity</h2>
            <span>
              {forecastWeather?.main.humidity.toFixed() ?? '-'}%
            </span>
          </div>
          <div className="col-span-1 items-center backdrop-blur-md p-2 shadow-lg rounded-xl flex flex-col border border-white/10">
            {forecastWindSpeedIcon}
            <h2 className="text-xl">Wind</h2>
            <span>
              {forecastWeather?.wind.speed.toFixed() ?? '-'} m/s
            </span>
          </div>
          <div className="col-span-1 items-center backdrop-blur-md p-2 shadow-lg rounded-xl flex flex-col border border-white/10">
            {forecastWindDirectionIcon}
            <h2 className="text-xl">Direction</h2>
            <span>
              {forecastWeather?.wind.deg.toFixed() ?? '-'}°
            </span>
          </div>
          <div className="col-span-1 items-center backdrop-blur-md p-2 shadow-lg rounded-xl flex flex-col border border-white/10">
            <Wi.WiBarometer className="w-12 h-12"/>
            <h2 className="text-xl">Pressure</h2>
            <span>
              {forecastWeather?.main.pressure.toFixed() ?? '-'} hPa
            </span>
          </div>
          <div className="col-span-1 items-center backdrop-blur-md p-2 shadow-lg rounded-xl flex flex-col border border-white/10">
            <Wi.WiCloud className="w-12 h-12"/>
            <h2 className="text-xl">Clouds</h2>
            <span>
              {forecastWeather?.clouds.all.toFixed() ?? '-'}%
            </span>
          </div>
          {forecastWeather?.rain ? (
            <div className="col-span-1 items-center backdrop-blur-md p-2 shadow-lg rounded-xl flex flex-col border border-white/10">
              <Wi.WiShowers className="w-12 h-12"/>
              <h2 className="text-xl">Rain</h2>
              <span>
                {Math.ceil(forecastWeather?.rain?.['3h'] ?? 0).toFixed() ?? '0'} mm
              </span>
            </div>
          ) : (forecastWeather?.snow ? (
            <div className="col-span-1 items-center backdrop-blur-md p-2 shadow-lg rounded-xl flex flex-col border border-white/10">
              <Wi.WiSnow className="w-12 h-12"/>
              <h2 className="text-xl">Rain</h2>
              <span>
                {Math.ceil(forecastWeather?.snow?.['3h'] ?? 0).toFixed() ?? '0'} mm
              </span>
            </div>
          ) : (
            <div className="col-span-1 items-center backdrop-blur-md p-2 shadow-lg rounded-xl flex flex-col border border-white/10">
              <Wi.WiRainMix className="w-12 h-12"/>
              <h2 className="text-xl">Rain / Snow</h2>
              <span>
                0 mm
              </span>
            </div>
          ))}
        </div>
        {/* Footer */}
        <div className="py-2 text-sky-950 text-center">
          <a href="https://www.pexels.com/photo/low-angle-shot-of-cloudy-sky-11326637/" className="text-sky-800">Photo by Engin Akyurt</a>
          <p>App by Kay Hennig</p>
          <a href="/imprint">Imprint</a>
        </div>

      </div>
    </div>
  )
};

export default App;