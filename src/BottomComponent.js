import React, { useEffect, useState } from 'react'
import './GameList.css'
import EmptyList from './EmptyList'
import GameList from './GameList'
import LoadingPage from './LoadingPage'

function BottomComponent({ searchSubmit, filter, setIsErrorMessageOpen, setErrorTittle }) {
    const [gameList, setGameList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
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
            setIsLoading(true)
            if (searchSubmit.length != 0) {
                await fetch(`
            https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&search=${searchSubmit}
            ${returnFilterPath()}
            `)
                    .then(response => response.json())
                    .then(data => {
                        setGameList(data.results)
                        setTimeout(setIsLoading(false), 1000)
                    })
            }
            else {
                await fetch(`
            https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&page=1
            ${returnFilterPath()}
            `)
                    .then(response => response.json())
                    .then(data => {
                        setGameList(data.results)
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
    }, [searchSubmit, filter])
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
        </div>
    )
}

export default BottomComponent
