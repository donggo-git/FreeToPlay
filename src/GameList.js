import React, { useEffect, useState } from 'react'
import './GameList.css'

function GameList({ searchInput }) {
    let api_key = '4d9f3393dbcd43549ea70dc0f6cff3b9'
    const [gameList, setGameList] = useState([])

    const fetchData = () => {
        if (searchInput.length != 0) {
            fetch(`https://api.rawg.io/api/games?key=${api_key}&search=${searchInput}`)
                .then(response => response.json())
                .then(data => setGameList(data.results))
        }
        else {
            fetch(`https://api.rawg.io/api/games?key=${api_key}&page=1`)
                .then(response => response.json())
                .then(data => {
                    setGameList(data.results)
                    console.log(data.results)
                })
        };
    }
    useEffect(() => fetchData(), [searchInput])

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