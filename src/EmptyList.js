import React from 'react'
import './EmptyList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCancel } from '@fortawesome/free-solid-svg-icons'


function EmptyList() {
    return (
        <div className='EmptyList'>
            <h1>404 <span><FontAwesomeIcon icon={faCancel} /></span></h1>
            <p>Sorry, we don't have the game you looking for</p>

        </div>
    )
}

export default EmptyList