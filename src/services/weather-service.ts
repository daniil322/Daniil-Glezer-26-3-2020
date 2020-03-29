import axios from 'axios'

const weatherApiUrl = 'http://dataservice.accuweather.com'

const getWeatherForcast = async (cityId: string) => {
    const response = await axios.get(`${weatherApiUrl}/forecasts/v1/daily/5day/${cityId}?metric=true&apikey=WJ9kOJdwSpEsVz3E6l5ULWiPpX8JoJL0&`)
    return response.data
}
const getLocationByCords = async (pos: Position) => {
    const response = await axios.get(`${weatherApiUrl}/locations/v1/cities/geoposition/search?apikey=WJ9kOJdwSpEsVz3E6l5ULWiPpX8JoJL0&q=${pos.coords.latitude}%2C${pos.coords.longitude}`)
    return response.data
}

const getAutoComplete = async (city: string) => {
    const response = await axios.get(`${weatherApiUrl}/locations/v1/cities/autocomplete?apikey=WJ9kOJdwSpEsVz3E6l5ULWiPpX8JoJL0&q=${city}`)
    return response.data
}
const getCurrConditions = async (cityId: string) => {
    const response = await axios.get(`${weatherApiUrl}/currentconditions/v1/${cityId}?apikey=WJ9kOJdwSpEsVz3E6l5ULWiPpX8JoJL0`)
    return response.data[0]
}

export default { getLocationByCords, getWeatherForcast, getAutoComplete, getCurrConditions, getWeatherForcastByLocation: getLocationByCords }

