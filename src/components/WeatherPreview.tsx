import React from 'react'
import { NewWeatherForcast, StoreState } from '../common/state'
import utils from '../services/utils'
import { useSelector } from 'react-redux'

interface Props {
    forcast: NewWeatherForcast
    addedDays: number
}

const WeatherPreview = ({ forcast: { temperature: { maximum, minimum }, day, night }, addedDays }: Props) => {
    const { unit } = useSelector((state: StoreState) => state)

    const maxValue = unit === 'C' ? Math.floor(maximum.value) : utils.celsiusToFareniht(maximum.value)
    const minValue = unit === 'C' ? Math.floor(minimum.value) : utils.celsiusToFareniht(minimum.value)

    return (
        <div>
            <p>{utils.getDateFormat(addedDays)}</p>
            <div className='flex justify-center'>
                <p className='unit-value'> {maxValue + unit}</p>
                <img src={utils.iconUrl(day.icon)} alt='' />
            </div>
            <div className='flex justify-center'>
                <p className='unit-value'>{minValue + unit}</p>
                <img src={utils.iconUrl(night.icon)} alt='' />
            </div>
        </div>
    )
}

export default WeatherPreview