import React, { useState } from 'react'
import './HomePage.css'
import SearchAndFilter from './SearchAndFilter'
import BottomComponent from './BottomComponent'
import ErrorMessage from './ErrorMessage'

function HomePage() {
    const [searchSubmit, setSearchSubmit] = useState('')
    const [isErrorMessageOpen, setIsErrorMessageOpen] = useState(false)
    const [invalidValue, setInvalidValue] = useState('')
    const [errorTitle, setErrorTittle] = useState('')
    const [filter, setFilter] = useState({
        genres: [],
        platforms: [],
        tags: []
    })
    const handleSearch = (input, e) => {
        e.preventDefault()
        //check user internet before searching
        if (!navigator.onLine) {
            setErrorTittle('connection')
            setIsErrorMessageOpen(true)
            return;
        }
        //check if user enter query that not characters, numerics or "-"
        else {
            const invalidInput = /[^a-zA-Z\d\s:]/ig
            if (invalidInput.test(input)) {

                setErrorTittle('input')
                setInvalidValue(input.match(invalidInput))
                setIsErrorMessageOpen(true)
                return;
            }
        }
        //searching
        setSearchSubmit(input)
    }
    const handleFilter = (section, input) => {
        //checking user connection before filter
        if (!navigator.onLine) {
            setErrorTittle('connection')
            setIsErrorMessageOpen(true)
            return;
        }
        //filter
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
    const closeErrorMessage = () => setIsErrorMessageOpen(false)
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
                setErrorTittle={setErrorTittle}
                setIsErrorMessageOpen={setIsErrorMessageOpen}
            />
            {/*if user enter invalid query in the finding bar Error Message will appear */}
            {isErrorMessageOpen &&
                <ErrorMessage
                    closeErrorMessage={closeErrorMessage}
                    invalidValue={invalidValue}
                    errorTitle={errorTitle}
                />
            }
        </div>
    )
}

export default HomePage