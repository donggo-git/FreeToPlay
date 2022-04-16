import React from 'react'
import FindingBar from './FindingBar'

function SearchAndFilter({ searchInput, handleSearch }) {
    return (
        <div>
            <FindingBar searchInput={searchInput} handleSearch={handleSearch} />
        </div>
    )
}

export default SearchAndFilter