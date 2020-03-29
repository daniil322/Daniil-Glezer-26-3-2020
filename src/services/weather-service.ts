import axios from 'axios'

const weatherApiUrl = process.env.NODE_ENV === 'development' ?
    'http://dataservice.accuweather.com' : 'https://dataservice.accuweather.com'

const apiKey = 'yshriNQ4ofbFWVfw7shjrv0lml6Rnphi' || 'WJ9kOJdwSpEsVz3E6l5ULWiPpX8JoJL0'
const getWeatherForcast = async (cityId: string) => {
    const response = await axios.get(`${weatherApiUrl}/forecasts/v1/daily/5day/${cityId}?metric=true&apikey=${apiKey}`)
    return response.data
}
const getLocationByCords = async (pos: Position) => {
    const response = await axios.get(`${weatherApiUrl}/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${pos.coords.latitude}%2C${pos.coords.longitude}`)
    return response.data
}

const getAutoComplete = async (city: string) => {
    const response = await axios.get(`${weatherApiUrl}/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${city}`)
    return response.data
}
const getCurrConditions = async (cityId: string) => {
    const response = await axios.get(`${weatherApiUrl}/currentconditions/v1/${cityId}?apikey=${apiKey}`)
    return response.data[0]
}

export default { getLocationByCords, getWeatherForcast, getAutoComplete, getCurrConditions, getWeatherForcastByLocation: getLocationByCords }

