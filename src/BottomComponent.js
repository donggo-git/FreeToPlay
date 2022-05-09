import React, { useEffect, useState } from 'react'
import './GameList.css'
import EmptyList from './EmptyList'
import GameList from './GameList'
import LoadingPage from './LoadingPage'
import ScrollLoading from './ScrollLoading'
import GameDetail from './GameDetail'

function BottomComponent({ searchSubmit, filter, setIsErrorMessageOpen, setErrorTittle }) {
    const [gameList, setGameList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isNotFound, setIsNotFound] = useState(false)
    const [currentSearch, setCurrentSearch] = useState(searchSubmit)
    const [currentFilter, setCurrentFilter] = useState(JSON.parse(JSON.stringify(filter)))
    const [page, setPage] = useState(1)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [currentGameID, setCurrentGameID] = useState("")
    //use to return the end of fetching base on user filter
    const returnFilterPath = () => {
        let returnPath = ''
        for (let section in filter) {
            if (filter[section].length != 0) {
                returnPath += `&${section}=${filter[section]}`
            }
        }
        return returnPath;
    }
    //fetching list of game base on user search or filter
    const fetchData = async () => {

        try {
            if (page == 1) setIsLoading(true)
            //if user filter or search
            //return a new game list base on user filter and search
            if (checkBeforeFetch()) {
                console.log(checkBeforeFetch())
                setIsLoading(true)
                //scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
                //set page to 1
                setPage(1)

                //fetch data base on user filter and search
                await fetch(`
            https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}${searchSubmit.length > 0 ? `&search=${searchSubmit}` : ``}&page=${String(page)}
            ${returnFilterPath()}
            `)
                    .then(response => response.json())
                    .then(data => {
                        if (data.results != undefined) {
                            setGameList(() => data.results)
                            setTimeout(setIsLoading(false), 1000)
                            setIsNotFound(false)
                        }
                        else {
                            setIsNotFound(true)
                        }
                    })

            }
            else {
                await fetch(`
            https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}${searchSubmit.length > 0 ? `&search=${searchSubmit}` : ``}&page=${String(page)}
            ${returnFilterPath()}
            `)
                    .then(response => response.json())
                    .then(data => {
                        if (data.results != undefined) {
                            setGameList(() => [...gameList, ...data.results])
                            setTimeout(setIsLoading(false), 1000)
                            setIsNotFound(false)
                        }
                        else {
                            setIsNotFound(true)
                        }
                    })
            }
        }
        catch (error) {
            setIsLoading(true);
            console.log(error)
        }
    }
    const checkBeforeFetch = () => {
        if (currentSearch != searchSubmit) {
            console.log("different search")
            setCurrentSearch(searchSubmit)
            return true;
        }
        for (let section in filter) {
            if (filter[section].toString() !== currentFilter[section].toString()) {
                console.log("different filter")
                setCurrentFilter(JSON.parse(JSON.stringify(filter)))
                return true
            }
        }
        return false
    }
    useEffect(() => {
        fetchData()
        window.addEventListener("scroll", handleScroll)

    }, [searchSubmit, filter, page])

    //fetching more data when user scroll down to bottom
    const handleScroll = () => {
        if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) == document.documentElement.offsetHeight) {
            setTimeout(setPage(page + 1), 100)
        }

    }
    const handleDetailOpen = (gameID = "") => {
        if (gameID === "") setIsDetailOpen(!isDetailOpen)
        else {
            console.log(gameID)
            setCurrentGameID(gameID)
            setTimeout(setIsDetailOpen(!isDetailOpen), 100)
        }
    }

    return (
        <div className='gameList__container'>
            {
                //when user using search and have available results
                searchSubmit.length > 0 && gameList.length > 0 ?
                    <div>
                        <p className='gameList__amount'>There are {gameList.length} results fit with your search</p>
                        <GameList
                            gameList={gameList}
                            setErrorTittle={setErrorTittle}
                            setIsErrorMessageOpen={setIsErrorMessageOpen}
                        />
                        <ScrollLoading />
                    </div> :
                    searchSubmit.length || isNotFound > 0 ?
                        //when user search, but don't have available game
                        <EmptyList /> :
                        //standard game list when user doesn't search
                        <div>
                            <GameList
                                gameList={gameList}
                                setErrorTittle={setErrorTittle}
                                setIsErrorMessageOpen={setIsErrorMessageOpen}
                                handleDetailOpen={handleDetailOpen}
                            />
                            <ScrollLoading />
                        </div>
            }
            {isLoading ? <LoadingPage top='180px' height='100%' width="100%" /> : <div></div>
            }
            {isDetailOpen && <GameDetail
                gameID={currentGameID}
                currentGameID={currentGameID}
                handleDetailOpen={handleDetailOpen} />}
        </div>
    )
}

export default BottomComponent
