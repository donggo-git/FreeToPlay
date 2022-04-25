import React, { useEffect, useState } from 'react'
import './GameList.css'
import EmptyList from './EmptyList'
import GameList from './GameList'
import LoadingPage from './LoadingPage'
import ScrollLoading from './ScrollLoading'

function BottomComponent({ searchSubmit, filter, setIsErrorMessageOpen, setErrorTittle }) {
    const [gameList, setGameList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    const [page, setPage] = useState(1)
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
            if (searchSubmit.length != 0) {
                await fetch(`
            https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&search=${searchSubmit}
            &page=${String(page)}
            ${returnFilterPath()}
            `)
                    .then(response => response.json())
                    .then(data => {
                        setGameList(() => [...gameList, ...data.results])
                        setTimeout(setIsLoading(false), 1000)
                    })
            }
            else {
                await fetch(`
            https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&page=${String(page)}${returnFilterPath()}
            `)
                    .then(response => response.json())
                    .then(data => {
                        setGameList([...gameList, ...data.results])
                        console.log(page)
                        setTimeout(setIsLoading(false), 1000)
                    })

            };
        }
        catch (error) {
            setIsLoading(true);
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
        window.addEventListener("scroll", handleScroll)
    }, [searchSubmit, filter, page])

    //fetching more data when user scroll down to bottom
    const handleScroll = () => {
        if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) == document.documentElement.offsetHeight) {
            setTimeout(setPage(page + 1), 1000)
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
                    </div> :
                    searchSubmit.length > 0 ?
                        //when user search, but don't have available game
                        <EmptyList /> :
                        //standard game list when user doesn't search
                        <GameList
                            gameList={gameList}
                            setErrorTittle={setErrorTittle}
                            setIsErrorMessageOpen={setIsErrorMessageOpen}
                        />
            }
            {isLoading ? <LoadingPage top='180px' height='100%' width="100%" /> : <div></div>
            }
            <ScrollLoading />
        </div>
    )
}

export default BottomComponent
