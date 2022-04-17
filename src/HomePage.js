import React, { useState } from 'react'
import './HomePage.css'
import SearchAndFilter from './SearchAndFilter'
import GameList from './GameList'

function HomePage() {
    const [searchInput, setSearchInput] = useState('')
    const [filter, setFilter] = useState({
        genres: [],
        platforms: [],
        tags: []
    })
    const handleSearch = (input) => {
        console.log(input)
        setSearchInput(input)
    }
    const handleFilter = (section, input) => {
        let updatedFilter = { ...filter }
        if (updatedFilter[section].indexOf(input) == -1) {
            updatedFilter[section].push(input)
        }
        else {
            let removedIndex = updatedFilter[section].indexOf(input)
            updatedFilter[section].splice(removedIndex, 1)
        }
        setFilter(updatedFilter)
    }
    return (
        <div className='Homepage'>
            <nav>
                <div className='logo'>Free to play</div>

            </nav>
            <SearchAndFilter
                searchInput={searchInput}
                handleSearch={handleSearch}
                handleFilter={handleFilter}
            />
            <GameList searchInput={searchInput} filter={filter} />
        </div>
    )
}

export default HomePage