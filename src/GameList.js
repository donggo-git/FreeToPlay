import React, { useState } from 'react'

function GameList({ gameList, setErrorTittle, setIsErrorMessageOpen }) {
    //when user click to each game in list it will send user to the official website of that game
    const handleGameLink = (gameID) => {
        if (!navigator.onLine) {
            setErrorTittle('connection')
            setIsErrorMessageOpen(true)
            return;
        }
        try {
            fetch(`https://api.rawg.io/api/games/${gameID}?key=${process.env.REACT_APP_API_KEY}`)
                .then(response => response.json())
                .then(data => window.open(data.website, '_blank'))
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <div className='gameList'>
                {
                    gameList.map(game => (
                        <div key={game.id} className="game" onClick={() => handleGameLink(game.id)}>
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