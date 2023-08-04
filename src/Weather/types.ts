// OpenWeatherMap response format
export interface Coordinates {
  lon: number;
  lat: number;
}
export interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}
export interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}
export interface Rain {
  '1h': number;
  '3h': number;
}
export interface Snow {
  '1h': number;
  '3h': number;
}
export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}
export interface Clouds {
  all: number;
}
export interface System {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}
export interface Weather {
  coord: Coordinates;
  weather: WeatherDescription[];
  base: string;
  main: MainWeather;
  visibility: number;
  rain?: Rain;
  snow?: Snow;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: System;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastWeather {
  dt: number;
  main: MainWeather;
  weather: WeatherDescription[];
  clouds: Clouds;
  wind: Wind;
  rain?: Rain;
  snow?: Snow;
  visibility: number;
  pop: number;
  sys: System;
  dt_txt: string;
}
export interface Forecast {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastWeather[];
}