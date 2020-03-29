import { Dispatch } from "redux";
import weatherService from "../services/weather-service";
import { City } from "../common/state";
import utils from "../services/utils";
import { NewWeatherForcast, WeatherCondition } from "../common/state";

enum WeatherActions {
    SetWeather = 'SET_WEATHER',
    SetCurrLocation = 'SET_AUTOCOMPLETELOCATION',
    SetCurrCondition = 'SET_CURRCONDITION',
    SetFavorites = 'SET_FAVORITES',
    SetTheme = 'SET_THEME',
    SetUnit = 'SET_UNIT'
}
function setWeather(weather: NewWeatherForcast[]) {
    return {
        type: WeatherActions.SetWeather,
        weather
    }
}
function setAutoComplete(currLocation: City[] | []) {
    return {
        type: WeatherActions.SetCurrLocation,
        currLocation
    }
}

function setCurrCondition(currCondition: WeatherCondition) {
    return {
        type: WeatherActions.SetCurrCondition,
        currCondition
    }
}

function setFavorites(favorites: WeatherCondition[]) {
    return {
        type: WeatherActions.SetFavorites,
        favorites
    }
}
function setTheme(theme: string) {
    return {
        type: WeatherActions.SetTheme,
        theme
    }
}

function setUnit(unit: string) {
    return {
        type: WeatherActions.SetUnit,
        unit
    }
}

export function getWeather(city: string) {
    return async (dispatch: Dispatch) => {
        try {
            const weather = await weatherService.getWeatherForcast(city);
            const forcast = utils.newWeatherForcast(weather)
            dispatch(setWeather(forcast));
            return weather
        } catch (err) {
            console.log('Had issues getting games', err);
        }
    };
}

export function getAutoCompleteLocation(city: string) {
    return async (dispatch: Dispatch) => {
        try {
            let locations: City[] = []
            if (city) {
                const newLocations = await weatherService.getAutoComplete(city);
                locations = utils.newAutoCompleteRequest(newLocations)
            }
            dispatch(setAutoComplete(locations));
            return locations
        } catch (err) {
            console.log('Had issues getting games', err);
        }
    };
}

export const getCurrConditions = (city: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const weather = await weatherService.getCurrConditions(city);
            const condition = utils.newCityCondition(weather)
            dispatch(setCurrCondition(condition));
            return condition
        } catch (err) {
            console.log('Had issues getting games', err);
        }
    };
}

export const getFavorites = (favorites: City[]) => {
    return async (dispatch: Dispatch) => {
        try {
            const res = favorites.map(async (city) => {
                const res = await weatherService.getCurrConditions(city.key);
                return utils.newCityCondition(res)
            })
            const newFavoritesConditions = await Promise.all(res)
            dispatch(setFavorites(newFavoritesConditions));
            return favorites
        } catch (err) {
            console.log('Had issues getting games', err);
        }
    };
}
export const toggleTheme = (theme: string) => {
    return (dispatch: Dispatch) => {
        try {
            dispatch(setTheme(theme));
            return theme
        } catch (err) {
            console.log('Had issues getting games', err);
        }
    };
}

export const toggleUnit = (unit: string) => {
    return (dispatch: Dispatch) => {
        try {
            dispatch(setUnit(unit));
            return unit
        } catch (err) {
            console.log('Had issues getting games', err);
        }
    };
}