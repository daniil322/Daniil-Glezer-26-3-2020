import React, { useEffect, useState } from 'react'
import storageService from '../services/storage-service'
import { useDispatch, useSelector } from 'react-redux'
import { getFavorites } from '../actions/weather-action'
import FavoritesList from '../components/FavoritesList'
import { StoreState } from '../common/state'
import { State } from '../common/types'

const FavoritesPage = () => {
    const dispatch = useDispatch()
    const [favorites, setFavorites] = useState(storageService.loadFromStorage())
    const { state } = useSelector((state: StoreState) => state);

    const updateFavorites = async () => {
        const favorites = storageService.loadFromStorage()
        await dispatch(getFavorites(favorites))
        setFavorites(favorites)
    }

    useEffect(() => {
        dispatch(getFavorites(favorites))
    }, [favorites, dispatch])

    return (
        <div>
            {state === State.Loading ? <div className='loader'></div> :
                <FavoritesList updateFavorites={updateFavorites} favorites={favorites} />
            }
        </div>)
}

export default FavoritesPage