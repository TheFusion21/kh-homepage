import React, { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce'
import isMobile from '../utils/isMobile';
import {
  TbSearch,
  TbGps,
} from 'react-icons/tb';
import { Forecast, Weather } from './types';

interface Location {
  latitude: number;
  longitude: number;
}
const App = () => {
  const [isLandscape, setIsLandscape] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [useLocation, setUseLocation] = useState(false);
  const [search, setSearch] = useState('London');
  const [debouncedSearch] = useDebounce(search, 500);
  const [locations, setLocations] = useState<any[]>([]);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  // get geocoding from search
  useEffect(() => {
    if (debouncedSearch) {
      fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${debouncedSearch}&limit=20&appid=545d3c077ff361e15a8a41a89c5321e3`)
        .then((res) => res.json())
        .then((data) => {
          setLocations(data);
        });
    }
  }, [debouncedSearch]);

  // get weather from location
  useEffect(() => {
    if (location) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=545d3c077ff361e15a8a41a89c5321e3&units=metric`)
        .then((res) => res.json())
        .then((data) => {
          setWeather(data as Weather);
        });
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=545d3c077ff361e15a8a41a89c5321e3&units=metric`)
        .then((res) => res.json())
        .then((data) => {
          setForecast(data as Forecast);
        });
    }
  }, [location]);

  // get location when permission granted and set useLocation to true
  useEffect(() => {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setUseLocation(true);
        });
      }
    });
  }, []);

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

  useEffect(() => {
    const getOrientation = () => {
      if (!isMobile()) {
        setIsLandscape(false);
      } else {
        switch (screen.orientation.type) {
          case "landscape-primary":
          case "landscape-secondary":
            setIsLandscape(true);
            break;
          default:
            setIsLandscape(false);
            break;
        }
      }
    };
    getOrientation();
    window.addEventListener("orientationchange", getOrientation);
    window.addEventListener("resize", getOrientation);
    return () => {
      window.removeEventListener("orientationchange", getOrientation);
      window.removeEventListener("resize", getOrientation);
    };
  }, []);

  const handleLocationSelect = (location: any) => {
    setLocation({
      latitude: location.lat,
      longitude: location.lon,
    });
    setUseLocation(false);
    setLocations([]);
  };

  return (
    <div className="flex justify-center items-center select-none" style={{minHeight: window.innerHeight, width: window.innerWidth, height: window.innerHeight}}>
      <div
        className={`flex flex-col w-full h-full items-center relative overflow-hidden ${!isMobile() ? 'max-w-[420px] max-h-[930px] shadow-lg' : ''} bg-cover bg-center relative`}
        style={{ backgroundImage: 'url(/background1.jpg)' }}
      >
        {/* Searchbar */}
        <div className="flex-col flex w-full absolute bg-black/30">
          <div className="w-full max-w-lg flex flex-row text-sky-100 text-base relative items-center">
            <input 
              type="text"
              className="grow w-0 bg-transparent border-0 outline-none h-full pl-2 pr-1 placeholder:text-zinc-300"
              placeholder='Search'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <TbSearch className={`w-10 h-10 p-2 ${search || !useLocation ? 'text-sky-300' : ''} shrink-0`} />
            <TbGps className={`w-10 h-10 p-2 ${useLocation ? 'text-sky-300' : ''} shrink-0`} onClick={() => setUseLocation(!useLocation)} />
          </div>
          <div>
          {locations.map((location) => (
            <div onClick={() => handleLocationSelect(location)} className="px-2 py-2 hover:bg-black/5 active:bg-black/10">
              {location.name}
            </div>  
          ))}
          </div>
        </div>
        <div className="mt-12"/>
        {/* Weather */}
        {weather && (
          <div className="w-full grid grid-cols-6 mx-4 gap-4">

          </div>
        )}
        {forecast && (
          <div className="w-full grid grid-cols-6 mx-4 gap-4">

          </div>
        )}
        {/* Footer */}
        <div>
            <a href="https://www.pexels.com/photo/low-angle-shot-of-cloudy-sky-11326637/">Photo by Engin Akyurt</a>
            <p>App by Kay Hennig</p>
        </div>
      </div>
    </div>
  )
};

export default App;