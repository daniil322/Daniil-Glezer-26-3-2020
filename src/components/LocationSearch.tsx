import React, { useCallback } from 'react'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { getAutoCompleteLocation, getWeather, getCurrConditions } from '../actions/weather-action'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { StoreState } from '../common/state';
import { City } from '../common/state';

interface Props {
    setCurrCity: Function,
    updateFavorite: Function
}

const LocationSearch = ({ setCurrCity, updateFavorite }: Props) => {
    const locations = useSelector((state: StoreState) => state.autoCompleteLocations)
    const dispatch = useDispatch()

    const findLocationDebounce = useCallback(_.debounce((city: string) => {
        dispatch(getAutoCompleteLocation(city))
    }, 600), [])

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        findLocationDebounce(ev.currentTarget.value)
    }

    const setCurrWeather = (key: string, name: string) => {
        dispatch(getWeather(key))
        dispatch(getCurrConditions(key))
        setCurrCity({ name, key })
        updateFavorite(key)
    }

    return (
        <div className='flex justify-center search-container'>
            <Autocomplete
                options={locations}
                size='medium'
                onChange={(ev: React.ChangeEvent<{}>, location: City | null) => {
                    if (!location) return
                    setCurrWeather(location.key, location.name)
                }}
                getOptionLabel={location => location.name}
                style={{ width: 250 }}
                renderInput={params => <TextField {...params} onChange={handleChange} label="Search" variant="outlined" />}
            />
        </div>
    )
}

export default LocationSearch