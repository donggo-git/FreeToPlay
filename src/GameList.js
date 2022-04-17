import React, { useEffect, useState } from 'react'
import './GameList.css'

function GameList({ searchInput, filter }) {
    let api_key = '4d9f3393dbcd43549ea70dc0f6cff3b9'
    const [gameList, setGameList] = useState([])
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
    const fetchData = () => {
        if (searchInput.length != 0) {
            fetch(`
            https://api.rawg.io/api/games?key=${api_key}&search=${searchInput}
            ${returnFilterPath()}
            `)
                .then(response => response.json())
                .then(data => setGameList(data.results))
        }
        else {
            fetch(`
            https://api.rawg.io/api/games?key=${api_key}&page=1
            ${returnFilterPath()}
            `)
                .then(response => response.json())
                .then(data => setGameList(data.results))
        };
    }
    useEffect(() => {
        fetchData()
        let filterPath = returnFilterPath()
    }, [searchInput, filter])

    return (
        <div className='gameList'>
            {
                gameList.length > 0 ?
                    gameList.map(game => (
                        <div key={game.name} className="game">
                            <img src={game.background_image} />
                            <p>{game.name}</p>
                            <div className='game__genres'>
                                {
                                    game.genres.map((genre) => (
                                        <div
                                            key={genre.name}
                                            className="game__genre">
                                            {genre.name}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )) :
                    <div></div>
            }
        </div>
    )
}

export default GameList