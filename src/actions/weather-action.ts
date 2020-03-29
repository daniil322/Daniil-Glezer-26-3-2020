import { Dispatch } from "redux";
import weatherService from "../services/weather-service";
import { City } from "../common/state";
import {
  normalizeWeatherForcast,
  normalizeAutoComplete,
  normalizeCityCondition
} from "../services/utils";
import { NewWeatherForcast, WeatherCondition } from "../common/state";
import { AppState } from "../common/types";

enum WeatherActions {
  SetWeather = "SET_WEATHER",
  SetCurrLocation = "SET_AUTOCOMPLETELOCATION",
  SetCurrCondition = "SET_CURRCONDITION",
  SetFavorites = "SET_FAVORITES",
  SetTheme = "SET_THEME",
  SetUnit = "SET_UNIT",
  SetState = "SET_APPSTATE"
}
function setWeather(weather: NewWeatherForcast[]) {
  return {
    type: WeatherActions.SetWeather,
    weather
  };
}
function setAutoComplete(currLocation: City[] | []) {
  return {
    type: WeatherActions.SetCurrLocation,
    currLocation
  };
}

function setCurrCondition(currCondition: WeatherCondition) {
  return {
    type: WeatherActions.SetCurrCondition,
    currCondition
  };
}

function setFavorites(favorites: WeatherCondition[]) {
  return {
    type: WeatherActions.SetFavorites,
    favorites
  };
}
function setTheme(theme: string) {
  return {
    type: WeatherActions.SetTheme,
    theme
  };
}

function setUnit(unit: string) {
  return {
    type: WeatherActions.SetUnit,
    unit
  };
}

function setLoadingStage(appState: AppState) {
  return {
    type: WeatherActions.SetState,
    appState
  };
}

export function getWeather(city: string) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingStage(AppState.Loading));
      const weather = await weatherService.getWeatherForcast(city);
      const forcast = normalizeWeatherForcast(weather);
      dispatch(setWeather(forcast));
      dispatch(setLoadingStage(AppState.Done));
      return weather;
    } catch (err) {
      console.log("Had issues getting games", err);
      dispatch(setLoadingStage(AppState.Error));
    }
  };
}

export function getAutoCompleteLocation(city: string) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingStage(AppState.Loading));
      let locations: City[] = [];
      if (city) {
        const newLocations = await weatherService.getAutoComplete(city);
        locations = normalizeAutoComplete(newLocations);
      }
      dispatch(setAutoComplete(locations));
      dispatch(setLoadingStage(AppState.Done));
      return locations;
    } catch (err) {
      console.log("Had issues getting games", err);
      dispatch(setLoadingStage(AppState.Error));
    }
  };
}

export const getCurrConditions = (city: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingStage(AppState.Loading));
      const weather = await weatherService.getCurrConditions(city);
      const condition = normalizeCityCondition(weather);
      dispatch(setCurrCondition(condition));
      dispatch(setLoadingStage(AppState.Done));
      return condition;
    } catch (err) {
      console.log("Had issues getting conditions", err);
      dispatch(setLoadingStage(AppState.Error));
    }
  };
};

export const getFavorites = (favorites: City[]) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingStage(AppState.Loading));
      const res = favorites.map(async city => {
        const res = await weatherService.getCurrConditions(city.key);
        return normalizeCityCondition(res);
      });
      const newFavoritesConditions = await Promise.all(res);
      dispatch(setFavorites(newFavoritesConditions));
      dispatch(setLoadingStage(AppState.Done));
      return favorites;
    } catch (err) {
      console.log("Had issues getting favorites", err);
      dispatch(setLoadingStage(AppState.Error));
    }
  };
};

export const toggleTheme = (theme: string) => {
  return (dispatch: Dispatch) => {
    try {
      dispatch(setTheme(theme));
      return theme;
    } catch (err) {
      console.log("Had issues toggling theme", err);
    }
  };
};

export const toggleUnit = (unit: string) => {
  return (dispatch: Dispatch) => {
    try {
      dispatch(setUnit(unit));
      return unit;
    } catch (err) {
      console.log("Had issues toggling unit", err);
    }
  };
};
