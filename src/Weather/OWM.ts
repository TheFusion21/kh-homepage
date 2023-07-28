const key = '545d3c077ff361e15a8a41a89c5321e3';

export interface Weather {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lon: number;
    lat: number;
  };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
  rain?: {
    '1h': number;
    '3h': number;
  };
  snow?: {
    '1h': number;
    '3h': number;
  };
}
export const getWeather = (
  latitude: number,
  longitude: number,
  units: 'standard' | 'metric' | 'imperial' = 'metric',
  lang: string = 'en'
): Promise<Weather> => {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&lang=${lang}&appid=${key}`)
    .then((res) => res.json());
};

export interface Geo {
  name: string;
  lat: number;
  lon: number;
  country: string;
  local_names?: {
    [key: string]: string;
  }
  state?: string;
}

export const geo = (
  query: string,
  limit: number = 5
) : Promise<Geo[]> => {
  limit = limit > 5 ? 5 : limit;
  return fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${key}`)
    .then((res) => res.json());
}

export const iconUrl = (icon: string) => `http://openweathermap.org/img/wn/${icon}@4x.png`;