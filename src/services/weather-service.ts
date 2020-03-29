import axios from "axios";
import { sample } from "lodash";

const protocal =
  process.env.NODE_ENV === "development" ? "http://" : "https://";
const baseUrl = "dataservice.accuweather.com";

const apiKey = [
  "i79NPI6Yy0owQN0IMcT1O81paeblDai8",
  "zOcG096xQjfHLc4MQQUv4Y2AGi1xeFGF",
  "zesKyrHstCFViYYdcBvs6qGiGXqSRtBY",
  "yshriNQ4ofbFWVfw7shjrv0lml6Rnphi",
  "WJ9kOJdwSpEsVz3E6l5ULWiPpX8JoJL0",
  "rYBVyyZFhtZkPwiQI6eQWaIYipiGFVma",
  "8MIzGGl33vxvfOwRUAaO7amkjot7RP42"
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
