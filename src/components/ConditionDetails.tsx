import React from 'react'
import { StoreState } from '../common/state';
import utils from '../services/utils';
import { City } from '../common/types';
import { useSelector } from 'react-redux';

interface Props {
    city: City;
}

const ConditionDetails = ({ city }: Props) => {
    const { currCondition, unit, } = useSelector((state: StoreState) => state)

    const temperatureValue = unit === 'C' ?
        Math.floor(currCondition.temperature?.metric.value) :
        Math.floor(currCondition.temperature?.imperial.value)

    return (
        <div className='flex column justify-center'>
            <div className='flex column justify-center curr-condition-container'>
                <div className='flex justify-center weather-text'>
                    <p className='center-self'>
                        {city.name}
                    </p>
                </div>
                <div className='flex justify-center curr-weather center-self '>
                    <img src={utils.iconUrl(currCondition.weatherIcon)} alt="" />
                    <p className='center-self '>
                        {`${temperatureValue} ${unit}`}
                    </p>
                </div>
                <div className='flex justify-center weather-text'>
                    <p> {currCondition.weatherText}</p>
                </div>
            </div>
        </div>
    )
}

export default ConditionDetails