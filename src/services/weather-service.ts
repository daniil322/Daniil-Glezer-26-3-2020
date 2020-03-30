import axios from "axios";
import { sample } from "lodash";

const protocal =
  process.env.NODE_ENV === "development" ? "http://" : "https://";
const baseUrl = "dataservice.accuweather.com";

const apiKey = [
  "WJ9kOJdwSpEsVz3E6l5ULWiPpX8JoJL0",
  "rYBVyyZFhtZkPwiQI6eQWaIYipiGFVma",
  "8MIzGGl33vxvfOwRUAaO7amkjot7RP42",
  "yPu77kXYByuhCrrRLTdrrNqPQmJKi1WO",
  "FKwlSoqGXQpxkE9rsEAW9hUU15KQxmAG",
  "O9AFzM6d6HAnPRzuuq1XvGAsCdGNMMgh",
  "PyDoAhvagvVRatEbkpAC6NS64Qqw7KIP",
  "b1rtH1c7YGAGM5oe3z8xmeRuenABGxtA"
];

const returnKey = () => sample(apiKey);

const getWeatherForcast = async (cityId: string) => {
  const response = await axios.get(
    `${protocal}${baseUrl}/forecasts/v1/daily/5day/${cityId}?metric=true&apikey=${returnKey()}`
  );
  return response.data;
};
const getLocationByCords = async (pos: Position) => {
  const response = await axios.get(
    `${protocal}${baseUrl}/locations/v1/cities/geoposition/search?apikey=${returnKey()}&q=${
      pos.coords.latitude
    }%2C${pos.coords.longitude}`
  );
  return response.data;
};

const getAutoComplete = async (city: string) => {
  const response = await axios.get(
    `${protocal}${baseUrl}/locations/v1/cities/autocomplete?apikey=${returnKey()}&q=${city}`
  );
  return response.data;
};
const getCurrConditions = async (cityId: string) => {
  const response = await axios.get(
    `${protocal}${baseUrl}/currentconditions/v1/${cityId}?apikey=${returnKey()}`
  );
  return response.data[0];
};

export default {
  getLocationByCords,
  getWeatherForcast,
  getAutoComplete,
  getCurrConditions,
  getWeatherForcastByLocation: getLocationByCords
};
