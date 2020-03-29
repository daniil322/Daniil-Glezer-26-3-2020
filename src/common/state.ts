import { ThemeColors, MeasureUnit, State } from "./types";

export interface City {
    key: string
    name: string
}

export interface WeatherCondition {
    temperature: TemperatureTypes
    weatherText: string,
    weatherIcon: number,
    epochTime: number
}

export interface TemperatureTypes {
    metric: Temperature;
    imperial: Temperature;
}

export interface Temperature {
    value: number;
    unit: string;
}

export interface NewTemperatureTypes {
    minimum: Temperature;
    maximum: Temperature;
}

export interface NewWeatherForcast {
    temperature: NewTemperatureTypes;
    day: NewDay;
    night: NewDay;
    epochDate: number
}

export interface NewDay {
    icon: number;
}

export interface StoreState {
    currCondition: WeatherCondition
    weather: NewWeatherForcast[]
    autoCompleteLocations: City[]
    favorites: WeatherCondition[]
    theme: ThemeColors
    unit: MeasureUnit
    state: State
}

