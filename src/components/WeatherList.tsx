import React from 'react'
import { useSelector } from 'react-redux'
import { StoreState } from '../common/state';
import WeatherPreview from './WeatherPreview';

const WeatherList = () => {
    const { weather, theme } = useSelector((state: StoreState) => state)

    const currTheme = theme === 'light' ? '' : 'dark'
    
    return <div className={`flex forcasts-container ${currTheme}`}>
        {weather.map((forcast, i) => {
            return (
                <div className={`forcast-container text-center ${currTheme}`} key={forcast.epochDate}>
                    <WeatherPreview forcast={forcast} addedDays={i} />
                </div>)
        })}
    </div>
}

export default WeatherList