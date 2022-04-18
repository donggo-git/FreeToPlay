import React, { useEffect, useState } from 'react'
import './GameList.css'
import EmptyList from './EmptyList'
import GameList from './GameList'
import LoadingPage from './LoadingPage'

function BottomComponent({ searchSubmit, filter }) {
    let api_key = '4d9f3393dbcd43549ea70dc0f6cff3b9'
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
                fetch(`
            https://api.rawg.io/api/games?key=${api_key}&search=${searchSubmit}
            ${returnFilterPath()}
            `)
                    .then(response => response.json())
                    .then(data => {
                        setGameList(data.results)
                        setTimeout(setIsLoading(false), 1000)
                    })
            }
            else {
                fetch(`
            https://api.rawg.io/api/games?key=${api_key}&page=1
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
                        <GameList gameList={gameList} />
                    </div> :
                    //when user don't use search
                    searchSubmit.length > 0 ?
                        <EmptyList /> :
                        //when 
                        <GameList gameList={gameList} />
            }
            {isLoading ? <LoadingPage top='180px' height='100%' width="100%" /> : <div></div>
            }
        </div>
    )
}

export default BottomComponent