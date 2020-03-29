import { City, NewWeatherForcast, WeatherCondition, StoreState } from "../common/state";
import { ThemeColors, MeasureUnit } from "../common/types";

interface WeatherActions {
  weather: NewWeatherForcast[];
  type: ActionTypes;
  currLocation: City[]
  favorites: WeatherCondition[]
  currCondition: WeatherCondition
  theme: ThemeColors
  unit: MeasureUnit
}

enum ActionTypes {
  SetWeather = 'SET_WEATHER',
  SetCurrCondition = 'SET_CURRCONDITION',
  SetAutoCompleteLocation = 'SET_AUTOCOMPLETELOCATION',
  SetFavorites = 'SET_FAVORITES',
  SetTheme = 'SET_THEME',
  SetUnit = 'SET_UNIT'
}

const INITIAL_STATE: StoreState = {
  autoCompleteLocations: [], weather: [],
  currCondition: {} as WeatherCondition, favorites: [],
  theme: ThemeColors.Light, unit: MeasureUnit.C
};

export default function weatherReducer(state = INITIAL_STATE, action: WeatherActions) {
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
      return { ...state, theme: action.theme }
    case ActionTypes.SetUnit:
      return { ...state, unit: action.unit }
    default:
      return state;
  }
}
