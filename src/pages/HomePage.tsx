import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import LocationSearch from '../components/LocationSearch';
import WeatherList from '../components/WeatherList';
import ConditionDetails from '../components/ConditionDetails';
import TimeBar from '../components/TimeBar';
import { getCurrConditions, getWeather } from '../actions/weather-action';
import utils from '../services/utils';
import WeatherService from '../services/weather-service';

const HomePage = () => {
    const [currCity, setCurrCity] = useState({ name: '', key: '' })
    const [isFavorite, setIsFavorite] = useState(false)
    const dispatch = useDispatch()

    const updateFavorite = (key: string) => {
        const favorite = utils.checkCity(key)
        if (favorite) {
            setIsFavorite(true)
        } else {
            setIsFavorite(false)
        }
    }

    const getUserLocation = useCallback(async (pos: Position) => {
        const location = await WeatherService.getLocationByCords(pos)
        if (!location.Key) return
        dispatch(getWeather(location.Key))
        dispatch(getCurrConditions(location.Key))
        setCurrCity({ name: location.LocalizedName, key: location.Key })
    }, [dispatch])

    let query = utils.useQuery()
    const key = query.get('key')
    const city = query.get('city')

    useEffect(() => {
        if (key && city) {
            setCurrCity({ key, name: city })
            dispatch(getCurrConditions(key))
            dispatch(getWeather(key))
            updateFavorite(key)
        } else {
            setCurrCity({ name: 'Tel Aviv', key: '215854' })
            dispatch(getCurrConditions('215854'))
            dispatch(getWeather('215854'))
            updateFavorite('215854')
            navigator.geolocation.getCurrentPosition(getUserLocation);
        }
    }, [dispatch, key, city, getUserLocation])

    return (
        <div className='home-page-container'>
            <div>
                <LocationSearch setCurrCity={setCurrCity} updateFavorite={updateFavorite} />
                <ConditionDetails city={currCity} />
                <TimeBar updateFavorite={updateFavorite} city={currCity} isFavorite={isFavorite} />
                <WeatherList />
            </div>}
        </div>
    )
}

export default HomePage
