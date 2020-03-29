import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import likedHeart from '../assets/imgs/heart.svg'
import heart from '../assets/imgs/heart-like.svg'
import storageService from '../services/storage-service';
import utils from '../services/utils';
import Snackbar from '@material-ui/core/Snackbar';
import { useState } from 'react'
import { City } from '../common/state';

interface Props {
    city: City;
    updateFavorite: (key: string) => void;
    isFavorite: boolean;
}

const TimeBar = ({ city, updateFavorite, isFavorite }: Props) => {
    const [modalState, setModalState] = useState('')
    const [showToolTip, setshowToolTip] = useState(true)

    const saveToFavorites = () => {
        const isFavorite = utils.checkCity(city.key)
        setshowToolTip(false)
        setModalState('')
        if (isFavorite) {
            storageService.removeFromStorage(city.key)
            setModalState('The city has been removed')
        } else {
            storageService.saveToStorage(city)
            setModalState('The city has been added')
        }
        updateFavorite(city.key)
    }

    const tooltipText = isFavorite ? 'Remove from favorites' : 'Add to favorites'
    const favoriteImg = isFavorite ? likedHeart : heart

    return (
        <div>
            <div className='current-date flex justify-center align-center'>
                {`${new Date().toLocaleString()}`}
                <Tooltip open={showToolTip} title={tooltipText}>
                    <img className='pointer' src={favoriteImg}
                        alt='heart' onClick={saveToFavorites} />
                </Tooltip>
            </div>
            <Snackbar
                autoHideDuration={1200}
                open={(modalState ? true : false)}
                onClose={() => setModalState('')}
                message={modalState}
            />
        </div>
    )
}

export default TimeBar