import React from 'react'

function GameList({ gameList }) {
    return (
        <div>
            <div className='gameList'>
                {
                    gameList.map(game => (
                        <div key={game.name} className="game">
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