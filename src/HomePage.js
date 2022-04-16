import React, { useState } from 'react'
import './HomePage.css'
import FindingBar from './FindingBar'
import SearchAndFilter from './SearchAndFilter'
import GameList from './GameList'

function HomePage() {
    const [searchInput, setSearchInput] = useState('')
    const handleSearch = (input) => {
        setSearchInput(input)
    }
    return (
        <div className='Homepage'>
            <nav>
                <div className='logo'>Free to play</div>

            </nav>
            <SearchAndFilter searchInput={searchInput} handleSearch={handleSearch} />
            <GameList searchInput={searchInput} />
        </div>
    )
}

export default HomePage