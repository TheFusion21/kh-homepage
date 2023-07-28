import React, { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Geo, Weather, geo, getWeather, iconUrl } from './OWM';
import {
  SlLocationPin,
  SlMagnifier,
} from 'react-icons/sl';
import {
  WiSunrise,
  WiSunset,
  WiCloud,
  WiStrongWind,
  WiWindDeg,
  WiRain,
  WiHumidity,
  WiBarometer,
} from 'react-icons/wi';
import {
  BsThermometerHigh,
  BsThermometerLow,
  BsThermometer,
} from 'react-icons/bs';
interface Location {
  lat: number;
  lon: number;
}
const App = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [searchResults, setSearchResults] = useState<Geo[]>([]);
  const [location, setLocation] = useState<Location | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [gpsEnabled, setGpsEnabled] = useState(false);
  
  useEffect(() => {
    if (debouncedSearch) {
      geo(debouncedSearch).then((res) => {
        setSearchResults(res);
      });
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (location) {
      getWeather(location.lat, location.lon).then((res) => {
        setWeather(res);
      });
      setSearchResults([]);
    }
  }, [location]);

  useEffect(() => {
    if (gpsEnabled) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      });
    } else {
      setLocation(null);
    }
  }, [gpsEnabled]);

  const windDirection = useMemo(() => {
    if (weather) {
      const deg = weather.wind.deg;
      if (deg > 348.75 || deg <= 11.25) {
        return 'N';
      } else if (deg > 11.25 && deg <= 33.75) {
        return 'NNE';
      } else if (deg > 33.75 && deg <= 56.25) {
        return 'NE';
      } else if (deg > 56.25 && deg <= 78.75) {
        return 'ENE';
      } else if (deg > 78.75 && deg <= 101.25) {
        return 'E';
      } else if (deg > 101.25 && deg <= 123.75) {
        return 'ESE';
      } else if (deg > 123.75 && deg <= 146.25) {
        return 'SE';
      } else if (deg > 146.25 && deg <= 168.75) {
        return 'SSE';
      } else if (deg > 168.75 && deg <= 191.25) {
        return 'S';
      } else if (deg > 191.25 && deg <= 213.75) {
        return 'SSW';
      } else if (deg > 213.75 && deg <= 236.25) {
        return 'SW';
      } else if (deg > 236.25 && deg <= 258.75) {
        return 'WSW';
      } else if (deg > 258.75 && deg <= 281.25) {
        return 'W';
      } else if (deg > 281.25 && deg <= 303.75) {
        return 'WNW';
      } else if (deg > 303.75 && deg <= 326.25) {
        return 'NW';
      } else if (deg > 326.25 && deg <= 348.75) {
        return 'NNW';
      }
    }
    return '';
  }, [weather]);

  return (
    <div className="bg-gradient-to-b from-sky-500 to-sky-300 dark:from-sky-900 dark:to-sky-700 w-screen h-screen">
      {/* Searchbar */}
      <div className="sm:fixed flex flex-col items-center w-full top-0">
        <div className="w-full flex flex-col justify-center items-center sm:w-max sm:my-2 bg-white dark:bg-zinc-800 dark:text-zinc-200 sm:rounded-md shadow-md">
          <div className="flex flex-row w-full p-2">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent border-0 outline-none text-lg grow sm:w-[16rem]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <SlMagnifier className={`w-8 h-8 shrink-0 p-2 cursor-pointer ${search.length > 0 && !gpsEnabled ? 'text-sky-500' : ''}`} />
            <div className="border-r border-zinc-300 dark:border-zinc-600 mx-2" />
            <SlLocationPin className={`w-8 h-8 shrink-0 p-2 cursor-pointer ${gpsEnabled ? 'text-sky-500' : ''}`} onClick={() => setGpsEnabled(!gpsEnabled)} />
          </div>
          {searchResults.map((result) => (
            <div className="flex flex-col border-t border-zinc-300 dark:border-zinc-600 w-full text-md pb-2">
              <span
                className="py-2 hover:bg-black/5 cursor-pointer w-full px-4"
                onClick={() => setLocation({ lat: result.lat, lon: result.lon })}
              >
                {`${result.local_names ? result.local_names['en'] : result.name} (${result.country}${result.state ? `, ${result.state}` : ''})`}
              </span>
            </div>
          ))}
        </div>
      </div>
      {weather && (
        <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-3 sm:mx-32 md:mx-48 xl:mx-96 sm:mt-16">
          <div className="col-span-full flex flex-col justify-center items-center">
            <img src={iconUrl(weather.weather[0].icon)} alt="Weather Icon" className="h-48" />
            <span className="uppercase dark:text-zinc-200 text-lg font-semibold">
              {weather.weather[0].description}
            </span>
          </div>
          <div className="dark:bg-black/20 rounded-lg dark:text-zinc-200 p-4 flex flex-col items-center shadow-md">
            <BsThermometer className="w-12 h-12 shrink-0 p-2" />
            <span>
              {`${weather.main.temp.toFixed(0)} °C`}
              {weather.main.feels_like.toFixed(0) !== weather.main.temp.toFixed(0) && (
                `feels like ${weather.main.feels_like.toFixed(0)} °C` 
              )}
            </span>
          </div>
          <div className="dark:bg-black/20 rounded-lg dark:text-zinc-200 p-4 flex flex-col items-center shadow-md">
            <BsThermometerHigh className="w-12 h-12 shrink-0 p-2" />
            <span>
              {`${weather.main.temp_max.toFixed(0)} °C`}
            </span>
          </div>
          <div className="dark:bg-black/20 rounded-lg dark:text-zinc-200 p-4 flex flex-col items-center shadow-md">
            <BsThermometerLow className="w-12 h-12 shrink-0 p-2" />
            <span>
              {`${weather.main.temp_min.toFixed(0)} °C`}
            </span>
          </div>
          <div className="dark:bg-black/20 rounded-lg dark:text-zinc-200 p-4 flex flex-col items-center shadow-md">
            <WiCloud className="w-12 h-12 shrink-0 p-2" />
            <span>
              {`${weather.clouds.all} %`}
            </span>
          </div>
          <div className="dark:bg-black/20 rounded-lg dark:text-zinc-200 p-4 flex flex-col items-center shadow-md">
            <WiStrongWind className="w-12 h-12 shrink-0 p-2" />
            <span>
              {`${weather.wind.speed} m/s`}
            </span>
          </div>
          <div className="dark:bg-black/20 rounded-lg dark:text-zinc-200 p-4 flex flex-col items-center shadow-md">
            <WiWindDeg className="w-12 h-12 shrink-0 p-2" style={{ transform: `rotate(${weather.wind.deg}deg)` }} />
            <span>
              {`${windDirection} (${weather.wind.deg}°)`}
            </span>
          </div>
          <div className="dark:bg-black/20 rounded-lg dark:text-zinc-200 p-4 flex flex-col items-center shadow-md">
            <WiSunrise className="w-12 h-12 shrink-0 p-2" />
            <span>
              {new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour12: true, minute: 'numeric', hour: 'numeric' })}
            </span>
          </div>
          <div className="dark:bg-black/20 rounded-lg dark:text-zinc-200 p-4 flex flex-col items-center shadow-md">
            <WiSunset className="w-12 h-12 shrink-0 p-2" />
            <span>
              {new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-US', { hour12: true, minute: 'numeric', hour: 'numeric' })}
            </span>
          </div>
          <div className="dark:bg-black/20 rounded-lg dark:text-zinc-200 p-4 flex flex-col items-center shadow-md">
            <WiHumidity className="w-12 h-12 shrink-0 p-2" />
            <span>
              {`${weather.main.humidity} %`}
            </span>
          </div>
          <div className="dark:bg-black/20 rounded-lg dark:text-zinc-200 p-4 flex flex-col items-center shadow-md">
            <WiBarometer className="w-12 h-12 shrink-0 p-2" />
            <span>
              {`${weather.main.pressure} hPa`}
            </span>
          </div>
          {weather.rain && (
            <div className="dark:bg-black/20 rounded-lg dark:text-zinc-200 p-4 flex flex-col items-center shadow-md">
              <WiRain className="w-12 h-12 shrink-0 p-2" />
              <span>
                {`${weather.rain['1h']} mm`}
              </span>
            </div>
          )}
        </div> 
      )}
    </div>
  )
};

export default App;