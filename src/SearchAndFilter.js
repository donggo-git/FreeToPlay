import React from 'react'
import FindingBar from './FindingBar'
import Filter from './Filter'

function SearchAndFilter({ searchInput, handleSearch, handleFilter }) {
    return (
        <div>
            <FindingBar searchInput={searchInput} handleSearch={handleSearch} />
            <Filter handleFilter={handleFilter} handleSearch={handleSearch} />
        </div>
    )
}

export default SearchAndFilter