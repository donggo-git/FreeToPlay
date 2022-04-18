import React, { useEffect, useState } from 'react'
import FindingBar from './FindingBar'
import Filter from './Filter'

function SearchAndFilter({ searchInput, handleSearch, handleFilter }) {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };
    const handleFilterOpen = () => {
        setIsFilterOpen(pre => !pre)
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [])
    return (
        <div>
            <FindingBar
                searchInput={searchInput}
                handleSearch={handleSearch}
            />
            <Filter
                handleFilter={handleFilter}
                handleSearch={handleSearch}
                scrollPosition={scrollPosition}
                isFilterOpen={isFilterOpen}
                handleFilterOpen={handleFilterOpen}
            />
        </div>
    )
}

export default SearchAndFilter