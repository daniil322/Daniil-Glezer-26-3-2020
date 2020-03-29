import storageService from "./storage-service";
import { City } from "../common/state";
import { useLocation } from "react-router";
import { RequestWeatherCondition, RequestAutoCompleteLocation, RequestWeather } from "../common/request";

const getDateFormat = (time: number) => {
    let date = new Date()
    if (time) {
        date.setDate(date.getDate() + time);
    }
    return `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}`
}

const checkCity = (key: string) => {
    const saveCitys = storageService.loadFromStorage()
    return saveCitys.find((city: City) => {
        return city.key === key
    })
}

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const iconUrl = (icon: number) => {
    return `https://developer.accuweather.com/sites/default/files/${icon < 10 ? `0${icon}` : icon}-s.png`
}

const AutoComplete = (autoComplete: RequestAutoCompleteLocation[]) => {
    return autoComplete.map((location) => {
        return { name: location.LocalizedName, key: location.Key }
    })
}

const CityCondition = ({ Temperature: { Metric, Imperial }, WeatherText, WeatherIcon, EpochTime }: RequestWeatherCondition) => {
    return {
        temperature: {
            metric: { value: Metric.Value, unit: Metric.Unit },
            imperial: { value: Imperial.Value, unit: Imperial.Unit }
        },
        weatherText: WeatherText,
        weatherIcon: WeatherIcon,
        epochTime: EpochTime
    }
}

const WeatherForcast = ({ DailyForecasts }: RequestWeather) => {
    return DailyForecasts.map(({ Temperature: { Maximum, Minimum }, EpochDate, Day, Night }) => {
        return {
            temperature: {
                maximum: { value: Maximum.Value, unit: Maximum.Unit },
                minimum: { value: Minimum.Value, unit: Minimum.Unit },
            },
            day: { icon: Day.Icon },
            night: { icon: Night.Icon },
            epochDate: EpochDate
        }
    })
}

const celsiusToFahrenheit = (c: number) => {
    return Math.floor(c * 9 / 5 + 32)
}

export default { celsiusToFareniht: celsiusToFahrenheit, getDateFormat, checkCity, useQuery, iconUrl, newAutoCompleteRequest: AutoComplete, newCityCondition: CityCondition, newWeatherForcast: WeatherForcast }