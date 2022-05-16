import React, { useEffect } from 'react'

function GameList({ gameList, handleDetailOpen }) {
    //when user click to each game in list it will send user to the official website of that game
    useEffect(() => console.log(gameList), [])
    return (
        <div>
            <div className='gameList'>
                {
                    gameList.map(game => (
                        <div
                            key={game.id}
                            className="game"
                            onClick={() => handleDetailOpen(game?.id + "")}
                        >
                            <img src={game.background_image} />
                            <p>{game.name}</p>
                            <div className='game__genres'>
                                {
                                    game.genres.slice(0, 3).map((genre) => (
                                        <div
                                            key={genre.name}
                                            className="game__genre">
                                            {genre.name}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default GameList