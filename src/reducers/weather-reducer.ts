import {
  City,
  NewWeatherForcast,
  WeatherCondition,
  StoreState
} from "../common/state";
import { ThemeColors, MeasureUnit, AppState } from "../common/types";

interface WeatherActions {
  weather: NewWeatherForcast[];
  type: ActionTypes;
  currLocation: City[];
  favorites: WeatherCondition[];
  currCondition: WeatherCondition;
  theme: ThemeColors;
  unit: MeasureUnit;
  appState: AppState;
}

enum ActionTypes {
  SetWeather = "SET_WEATHER",
  SetCurrCondition = "SET_CURRCONDITION",
  SetAutoCompleteLocation = "SET_AUTOCOMPLETELOCATION",
  SetFavorites = "SET_FAVORITES",
  SetTheme = "SET_THEME",
  SetUnit = "SET_UNIT",
  SetState = "SET_APPSTATE"
}

const INITIAL_STATE: StoreState = {
  autoCompleteLocations: [],
  weather: [],
  currCondition: {} as WeatherCondition,
  favorites: [],
  theme: ThemeColors.Light,
  unit: MeasureUnit.C,
  appState: AppState.Init
};

const weatherReducer = (state = INITIAL_STATE, action: WeatherActions) => {
  switch (action.type) {
    case ActionTypes.SetWeather:
      return { ...state, weather: action.weather };
    case ActionTypes.SetCurrCondition:
      return { ...state, currCondition: action.currCondition };
    case ActionTypes.SetAutoCompleteLocation:
      return { ...state, autoCompleteLocations: action.currLocation };
    case ActionTypes.SetFavorites:
      return { ...state, favorites: action.favorites };
    case ActionTypes.SetTheme:
      return { ...state, theme: action.theme };
    case ActionTypes.SetUnit:
      return { ...state, unit: action.unit };
    case ActionTypes.SetState:
      return { ...state, appState: action.appState };
    default:
      return state;
  }
};

export default weatherReducer;
