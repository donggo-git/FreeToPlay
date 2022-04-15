import React from 'react'
import './FindingBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function FindingBar() {
    return (
        <div className='search'>
            <input
                type='text'
                className='search_input'
                placeholder='search for puppy, kitty etc.'
            />
            <div className='search_btn'>
                <FontAwesomeIcon icon={faMagnifyingGlass} color />
                <p>search</p>
            </div>
        </div>
    )
}

export default FindingBar