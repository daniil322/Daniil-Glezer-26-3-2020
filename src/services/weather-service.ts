import axios from 'axios'

const protocal = process.env.NODE_ENV === 'development' ?
    'http://' : 'https://'
const baseUrl = 'dataservice.accuweather.com'

const apiKey = ['zesKyrHstCFViYYdcBvs6qGiGXqSRtBY','yshriNQ4ofbFWVfw7shjrv0lml6Rnphi', 'WJ9kOJdwSpEsVz3E6l5ULWiPpX8JoJL0']
const getWeatherForcast = async (cityId: string) => {
    const response = await axios.get(`${protocal}${baseUrl}/forecasts/v1/daily/5day/${cityId}?metric=true&apikey=${apiKey[0]}`)
    return response.data
}
const getLocationByCords = async (pos: Position) => {
    const response = await axios.get(`${protocal}${baseUrl}/locations/v1/cities/geoposition/search?apikey=${apiKey[0]}&q=${pos.coords.latitude}%2C${pos.coords.longitude}`)
    return response.data
}

const getAutoComplete = async (city: string) => {
    const response = await axios.get(`${protocal}${baseUrl}/locations/v1/cities/autocomplete?apikey=${apiKey[0]}&q=${city}`)
    return response.data
}
const getCurrConditions = async (cityId: string) => {
    const response = await axios.get(`${protocal}${baseUrl}/currentconditions/v1/${cityId}?apikey=${apiKey[0]}`)
    return response.data[0]
}


export default { getLocationByCords, getWeatherForcast, getAutoComplete, getCurrConditions, getWeatherForcastByLocation: getLocationByCords }

