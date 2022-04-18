import React, { useState } from 'react'
import './HomePage.css'
import SearchAndFilter from './SearchAndFilter'
import LoadingPage from './LoadingPage'
import BottomComponent from './BottomComponent'

function HomePage() {
    const [searchSubmit, setSearchSubmit] = useState('')
    const [filter, setFilter] = useState({
        genres: [],
        platforms: [],
        tags: []
    })
    const handleSearch = (input, e) => {
        e.preventDefault()
        setSearchSubmit(input)
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
                handleSearch={handleSearch}
                handleFilter={handleFilter}
            />
            <BottomComponent
                searchSubmit={searchSubmit}
                filter={filter}
            />
        </div>
    )
}

export default HomePage