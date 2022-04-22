import React, { useState } from 'react'
import './SearchingBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function SearchingBar({ handleSearch }) {
    const [searchInput, setSearchInput] = useState('')
    const handleSearchInput = (input) => {
        setSearchInput(input)
    }
    return (
        <div className='search'>
            <input
                type='text'
                className='search_input'
                placeholder='search for the game you want'
                value={searchInput}
                onChange={(e) => handleSearchInput(e.target.value)}
            />
            <div
                className='search_btn'
                onClick={(e) => handleSearch(searchInput, e)}
            >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <p>search</p>
            </div>
        </div>
    )
}

export default SearchingBar
