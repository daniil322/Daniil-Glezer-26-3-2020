import React from 'react'
import Modal from '@material-ui/core/Modal';
import { State } from '../common/types';

interface Props {
    state: State
}

const ErrorModal = ({ state }: Props) => {
    return (
        <Modal
            open={state === State.Error}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div className='error-modal'>
                {state}
            </div>
        </Modal>
    )
}

export default ErrorModal